import {React, useState, useEffect} from 'react';
import './home_module.css';
import Rating from './components/Rating';
import Pagination from './components/Pagination';
import { collection, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { useAuthContext } from '../../context/AuthContext';
import {Link} from 'react-router-dom'



function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage] = useState(4);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { setUsersData } = useAuthContext()

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;

  const generateProjects = () => {

        const currentProjects = projects.slice(
            indexOfFirstObject,
            indexOfLastObject
        ) 
        
        return currentProjects.map((project, index) => (
          <Link to='project-details' state={{...project}} key={index} className="project w-100 mb-5 mb-md-0">
              <img src={project.photoURL} alt="" className='project-image'></img>
              <h4>{project.projectName}</h4>
              <Rating rating={project.rating ? project.rating : 0} />
          </Link>
        ));
  }


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

  }, [search]);

  const displaySuggestions = () => suggestions.map( (suggestion, i) => 
    <Link to='project-details' state={{...suggestion}} key={i} className="project w-100 mb-5 mb-md-0">
      <div className='suggestion'>
        {suggestion.projectName}
        <img src={suggestion.photoURL} alt="" className="search-img"></img>
      </div>
    </Link>
  )

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
      <div className='home container mx-auto'>
        <div>
          <h1 className="text-center pt-5 mb-4">Projects Gallery</h1>
        </div>
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