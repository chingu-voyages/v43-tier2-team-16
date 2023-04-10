import { React, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './project_details.css';
import { AuthContext } from "../../../context/AuthContext";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase-config";

function ProjectDetails(){

    const {currentUser} = useContext(AuthContext);

    const [currentRating, setCurrentRating] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);
    const location = useLocation();
    const data = location.state;

    const stars = Array(5).fill(0);

    let ratings = data.ratings ? data.ratings : [];

    const thisUserRating = {
        id: currentUser !== null && Object.keys(currentUser).length > 0 ? currentUser.uid : "",
        rating: currentRating
    }

    const docRef = doc(db, "projects", data.id);

    useEffect(() => {

        if(currentUser !== null && Object.keys(currentUser).length > 0){
            const userRated = ratings ? ratings.filter(rating => {
                if(rating.id === thisUserRating.id){
                    return rating;
            }}) : [];
            if(userRated.length > 0){
                setCurrentRating(userRated[0].rating);
            }
        }

    }, [currentUser])

    useEffect(() => {

        let ratingSum = 0;

        if(thisUserRating.id && currentRating > 0){

            const userRated = ratings ? ratings.filter(rating => rating.id === thisUserRating.id) : [];

            if(ratings.length > 0){
                if(userRated.length > 0){
                    const newRatings = ratings.map( rating => {
                        if(rating.id === thisUserRating.id){
                            rating = thisUserRating;
                        }
                        return rating;
                    })
                    ratings = newRatings;
                } else {
                    ratings.push(thisUserRating);
                };
            } else ratings=[thisUserRating];

            ratings.forEach(rating => {
                ratingSum += rating.rating
            });

            updateDoc(docRef,{
                ...data,
                ratings: ratings,
                rating: ratingSum/ratings.length
            });
        };

    }, [currentRating]);

    const handleClick = (e) => setCurrentRating(parseInt(e.target.id) + 1);
    const handleMouseEnter = (e) => setHoverStars(parseInt(e.target.id) + 1);
    const handleMouseLeave = () => setHoverStars(0);

    const displayRating = () => {
        return stars.map( (star, index) => 
            <div 
                className={`star ${(currentRating || hoverStars) > index ? "hovered" : ""}`}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                id={index}
                key={index}></div>)
    }

    return (
        <div className="project-details">
            <div className="image-container">
                <img src={data.photoURL} alt="" className="project-img"></img>
            </div>
            <div className="project-about">
                <h3>{data.projectName}</h3>
                <p>About: {data.description}</p>
                <p>Stack: {data.stacks}</p>
                <p>Author: {data.developer}</p>
                <div>Visit site: <a 
                    href={data.liveSite.includes("https://") ? data.liveSite : "https://" + data.liveSite} 
                    target="_blank"><button>Live Demo</button></a>
                </div>
                { currentUser !== null && data.uid !== currentUser.uid  ?
                <div className="stars">
                    <span className="rate">Rate project: </span>
                    {displayRating()}
                </div> : "" }
            </div>
        </div>
    )
}

export default ProjectDetails;