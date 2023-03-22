import React from "react";
import classes from "../LandingPage/home_module.css";
import "./home_module.css";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase-config";

function Home() {
   const [currentPage, setCurrentPage] = useState(1);
   const [objectsPerPage] = useState(4);
   const [projects, setProjects] = useState([]);

   const indexOfLastObject = currentPage * objectsPerPage;
   const indexOfFirstObject = indexOfLastObject - objectsPerPage;

   //  const generateImgs = () => {
   //     const images = [];

   //     for (let i = 0; i < 50; i++) {
   //        images.push(`https://source.unsplash.com/random/400x400?sig=${i}`);
   //     }

   //     const currentObjects = images.slice(
   //        indexOfFirstObject,
   //        indexOfLastObject
   //     );

   //     return currentObjects.map((image, index) => (
   //        <img src={image} alt="" key={index}></img>
   //     ));
   //  };

   useEffect(() => {
      const getProjects = () => {
         const q = collection(db, "projects");
         const unsub = onSnapshot(q, querySnapshot => {
            // const projects = [];
            const proj = querySnapshot.docs.map(document => {
               return { id: document.id, ...document.data() };
            });
            console.log(proj);
            setProjects(proj);
            // });
         });

         return () => {
            unsub();
         };
      };

      getProjects();
   }, []);

   const handleKeyPress = event => {
      console.log(event.target.value);
   };

   const handlePageClick = event => {
      const newCurrentPage = event.selected + 1;
      setCurrentPage(newCurrentPage);
   };

   return (
      <div className="home">
         <h1 className="title">Projects gallery</h1>
         <input
            type="text"
            className="searchbar"
            placeholder="🔍 Search"
            onKeyDown={handleKeyPress}
         />
         {projects.map(project => (
            <div key={project.id}>
               <p>{project.developer}</p>
               <img src={project.photoURL} alt="" />
            </div>
         ))}
         {/* <div className="projects-container">{generateImgs()}</div> */}
         <div className="pagination">
            <Pagination
               objectsTotal={50}
               objectsPerPage={objectsPerPage}
               handlePageClick={handlePageClick}
            />
         </div>
      </div>
   );
}

export default Home;
