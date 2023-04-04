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
                <p>About: {data.description}</p>
                <p>Stack: {data.stacks}</p>
                <p>Author: {data.developer}</p>
                <div>Visit site: <a 
                    href={data.liveSite.includes("https://") ? data.liveSite : "https://" + data.liveSite} 
                    target="_blank">{data.liveSite}</a>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;