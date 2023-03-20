import React from 'react';
import classes from '../LandingPage/home_module.css';
import './home_module.css';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';

function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage] = useState(4);

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  

  const generateImgs = () => {

    const images = [];

    for(let i=0; i<50; i++){
      images.push(`https://source.unsplash.com/random/400x400?sig=${i}`)
    };

    const currentObjects =  images.slice(indexOfFirstObject, indexOfLastObject);

    return currentObjects.map( (image, index) => <img src={image} key={index}></img>)
  };

  
  const handleKeyPress = (event) => {
    console.log(event.target.value)
  }

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1;
    setCurrentPage(newCurrentPage);
  };

    return (
      <div className='home'>
        <h1 className='title'>Projects gallery</h1>
        <input type="text" className="searchbar" placeholder="🔍 Search" onKeyDown={handleKeyPress} />
        <div className='projects-container'>
          {generateImgs()}
        </div>
        <div className='pagination'>
          <Pagination 
              objectsTotal={50} 
              objectsPerPage={objectsPerPage} 
              handlePageClick={handlePageClick}/>
        </div>
      </div>
    );
  }
  
  export default Home;
  