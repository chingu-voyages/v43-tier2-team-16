import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './project_details.css'

function ProjectDetails(){

    const location = useLocation();
    const data = location.state

    return (
        <div className="project-details">
            <div className="image-container">
                <img src={data.photoURL} alt=""></img>
            </div>
            <div className="project-about">
                <h3>{data.projectName}</h3>
                <p><span>About: </span>{data.description}</p>
                <p><span>Stack: </span>{data.stacks}</p>
                <p><span>Author: </span>{data.developer}</p>
                <div className="demo">
                    <a 
                    href={data.liveSite.includes("https://") ? data.liveSite : "https://" + data.liveSite} 
                    target="_blank"><button onClick={data.liveSite}>Live Demo</button></a>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;