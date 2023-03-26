import React, { useContext } from "react";
import "./project.scss";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
// import Form from "../../layout/Form";
import { arrayUnion, doc, setDoc, updateDoc } from "@firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Project = () => {
   const { currentUser } = useContext(AuthContext);
   const navigate = useNavigate();
   //  const [imageUpload, setImageUpload] = useState(null);
   // const [url, setUrl]= useState('')
   //  const [imageList, setImageList] = useState([]);

   //  const handleImageChange = e => {
   //     if (e.target.files[0]) {
   //     }
   //     setImageUpload(e.target.files[0]);
   //  };
   //  console.log(imageUpload)
   // if(imageUpload == null) return
   // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
   // uploadBytes(imageRef, imageUpload).then(() => {
   //   alert("image uploaded")
   // })
   //  const imageListRef = ref(storage, "/images");

   const handleUpload = async e => {
      e.preventDefault();
      const projectName = e.target[0].value;
      const liveSite = e.target[1].value;
      const stacks = e.target[2].value;
      const file = e.target[3].files[0];
      const descr = e.target[4].value;

      try {
         const imageRef = ref(storage, `/images/${file.name}`);
         await uploadBytes(imageRef, file).then(() => {
            getDownloadURL(imageRef).then(async url => {
               try {
                  //  setImageList(prev => [...prev, url]);
                  await setDoc(doc(db, "projects", uuid()), {
                     uid: currentUser.uid,
                     developer: currentUser.displayName,
                     projectName,
                     liveSite,
                     stacks,
                     photoURL: url,
                     description: descr,
                  });
                  await updateDoc(doc(db, "users", currentUser.uid), {
                     projects: arrayUnion({
                        developer: currentUser.displayName,
                        projectName,
                        liveSite,
                        stacks,
                        photoURL: url,
                        description: descr,
                     }),
                  });
               } catch (err) {
                  console.log(err);
               }
            });
         });
      } catch (err) {
         console.log(err);
      }
      navigate("/");
   };
   //  useEffect(() => {
   //     listAll(imageListRef).then(response => {
   //        response.items.forEach(item => {
   //           console.log(response);
   //           getDownloadURL(item).then(url => {
   //              setImageList(prev => [...prev, url]);
   //           });
   //        });
   //     });
   //  }, []);

   return (
      <section className="new-project container">
         <h1 className="text-center pt-5">New project</h1>
         <div className="form-wrapper mt-5">
            <form onSubmit={handleUpload}>
               <div className="input-wrapper">
                  <label htmlFor="project_name">Project Name:</label>
                  <input
                     type="text"
                     id="project_name"
                  />
               </div>
               <div className="input-wrapper">
                  <label htmlFor="live_site_URL">Live site URL:</label>
                  <input
                     type="text"
                     id="live_site_URL"
                     placeholder="https://..."
                  />
               </div>
               <div className="input-wrapper">
                  <label htmlFor="stacks">Tools used:</label>
                  <input type="text" id="stacks" placeholder='e.g. "HTML CSS JavaScript"' />
               </div>
               <div className="file-input-wrapper d-flex flex-column flex-lg-row justify-content-center align-items-center">
                  <label htmlFor="featured_image">Featured Image:</label>
                  <input type="file" id="featured_image" placeholder="Featured Image"/>
               </div>
               {/* <button onClick={handleUploadImage}>Upload Image</button> */}
               <div className="input-wrapper d-flex flex-column flex-lg-row justify-content-center">
                  <label htmlFor="description">Short description:</label>
                  <textarea
                     id="description"
                     type="message"
                     rows="3"
                  />
               </div>
               <button className="mt-5 btn-success" type="submit">Upload Project</button>
            </form>
         </div>
         {/* <div className="images_container">
            {imageList.map((url, id) => {
               return <Form image={url} key={id} />;
            })}
         </div> */}
      </section>
   );
};

export default Project;
