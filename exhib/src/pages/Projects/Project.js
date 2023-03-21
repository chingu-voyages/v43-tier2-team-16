import React, { useContext } from "react";
import classes from "../Projects/project.module.css";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from 'uuid'
// import Form from "../../layout/Form";
import { doc, setDoc } from "@firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const Project = () => {
   const { currentUser } = useContext(AuthContext);
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
                  await setDoc(doc(db, "projects", currentUser.uid), {
                     uid: currentUser.uid,
                     developer: currentUser.displayName,
                     projectName,
                     liveSite,
                     stacks,
                     photoURL: url,
                     description: descr,
                  });
               } catch (err) {
                  console.log(err);
               }
            });
         });
      } catch (err) {
         console.log(err);
      }
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
      <section className={classes.projects}>
         <h1>Kindly fill out the form to upload a project.</h1>
         <div className={classes.form}>
            <form onSubmit={handleUpload}>
               <div>
                  <label htmlFor="project_name">Project Name:</label>
                  <input
                     type="text"
                     id="project_name"
                     placeholder="project name"
                  />
               </div>
               <div>
                  <label htmlFor="live_site_URL">Live site URL:</label>
                  <input
                     type="text"
                     id="live_site_URL"
                     placeholder="Live site URL"
                  />
               </div>
               <div>
                  <label htmlFor="stacks">Stacks used:</label>
                  <input type="text" id="stacks" placeholder="stacks used" />
               </div>
               <input type="file" />
               {/* <button onClick={handleUploadImage}>Upload Image</button> */}
               <textarea
                  type="message"
                  cols="20 "
                  rows="10"
                  placeholder="Give a short description of your work"
               />
               <button type="submit">Upload Project</button>
            </form>
         </div>
         {/* <div className={classes.images_container}>
            {imageList.map((url, id) => {
               return <Form image={url} key={id} />;
            })}
         </div> */}
      </section>
   );
};

export default Project;
