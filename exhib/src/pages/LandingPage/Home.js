import React from 'react';
import classes from '../LandingPage/home_module.css';
import './home_module.css';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { collection, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { useAuthContext } from '../../context/AuthContext';



function Home() {
   const [currentPage, setCurrentPage] = useState(1);
   const [objectsPerPage] = useState(4);
   const [projects, setProjects] = useState([]);
   const [search, setSearch] = useState("");
   const [suggestions, setSuggestions] = useState([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [idToFind, setIdToFind] = useState("");

   const { setUsersData } = useAuthContext()

   const indexOfLastObject = currentPage * objectsPerPage
   const indexOfFirstObject = indexOfLastObject - objectsPerPage

   const generateProjects = () => {
         
         const currentProjects = projects.slice(
            indexOfFirstObject,
            indexOfLastObject
         ) 
         
         return currentProjects.map((project, index) => (
            <div key={index} className="project" id={project.id + "1"}>
               <img src={project.photoURL} alt=""></img>
               <h4>{project.projectName}</h4>
            </div>
         ));
   } 

   const findProject = (e) => {

      let projectIndex = 0;

      projects.forEach( (project, index) => {
         if(project.id === e.target.id){
            projectIndex = index;
         };
      });

      setCurrentPage(Math.ceil((projectIndex + 1)/objectsPerPage));
      setIdToFind(`${e.target.id + "1"}`)
   }

   useEffect(() => {

      const elementToFind = document.getElementById(idToFind)
      
      if(elementToFind){
         elementToFind.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center"});
      };

   }, [idToFind])

   useEffect(() => {
      const getProjects = () => {
         const q = collection(db, 'projects')
         const unsub = onSnapshot(q, querySnapshot => {
           // const projects = [];
            const proj = querySnapshot.docs.map(document => {
               return { id: document.id, ...document.data() }
            })
            console.log(proj)
            setProjects(proj)
            setUsersData(proj)
           // });
      })
   
         return () => {
            unsub();
         };
      };
      getProjects();
   }, []);

   useEffect( () => {

      const searchWord = search.toLowerCase();
      const tempSuggestions = [];

      projects.forEach( project => {

         const projectName = project.projectName.toLowerCase();
         const containes = tempSuggestions.some( sugg => sugg.id === project.id)

         if(!projectName.startsWith(searchWord) || containes){
            return;
         } else {
               tempSuggestions.push(project);
         };
      })

      if(search !== ""){
         setShowSuggestions(true);
      } else setShowSuggestions(false);

      setSuggestions(tempSuggestions);

   }, [search])

   const displaySuggestions = () => suggestions.map( (suggestion, i) => 
      <div key={i} id={suggestion.id} className='suggestion' onClick={findProject}>
         {suggestion.projectName}
         <img src={suggestion.photoURL} alt="" className="search-img"></img>
      </div>)

   const handlePageClick = event => {
      const newCurrentPage = event.selected + 1;
      setCurrentPage(newCurrentPage);
   };

   const handleFocus = (e) => {
      if(e.target.value === ""){
         return;
      } else setShowSuggestions(true);
   }

   return (
      <div className='home'>
         <h2 className='title'>Projects gallery</h2>
         <input 
            type="text" 
            className="searchbar"
            placeholder="🔍 Search"
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={()  => setTimeout(() => {setShowSuggestions(false)}, 200)}
         />
         <div className="projects-outer-container">
            <div className={`suggestions ${showSuggestions ? "" : "hidden"}`}>
               {displaySuggestions()}
            </div>
            <div className="projects-inner-container">
               {generateProjects()}
            </div>
         </div>
         <Pagination 
               objectsTotal={projects.length} 
               objectsPerPage={objectsPerPage} 
               handlePageClick={handlePageClick}
               currentPage={currentPage} />
      </div>
   );
}

   export default Home;