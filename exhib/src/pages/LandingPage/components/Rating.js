import React from 'react';
import './rating.css'

function Rating({rating}){
    
    function getStars(value){

        const num = Math.ceil(value);
        let lastStar = 100 - ((num - value) * 100);
        const starsNum = Array(5).fill(0);

        for(let i = 0; i < num; i++){
            if(i + 1 === num){
                    starsNum[i] = lastStar;
                }
            else starsNum[i] = 100;
        }
        
        const starsFinal = starsNum.map((star, index) => {
            if(star !== 0 && star < 100){
                if(star <= 15){
                    lastStar = lastStar + 10;
                } else if (star >= 85){
                    lastStar = lastStar - 10;
                }
                return ( 
                    <div className='star-container' key={index}>
                        <div className="outer-star">
                            <div 
                            className='inner-star' 
                            style={{width: `${lastStar}%`}}></div>
                        </div>
                    </div>
                )}
            else if (star === 100){
                return (
                    <div className='star-container' key={index}>
                        <div className="outer-star">
                            <div 
                            className='inner-star'
                            style={{width: "100%"}}></div>
                        </div>
                    </div>
                )}
            else return (
                <div className='star-container' key={index}>
                    <div className="outer-star"></div>
                </div>
            )
        })

        return starsFinal;
    }
    
    const starsRating = getStars(rating) 

    return (
        <div className='stars-container'>
            {starsRating}
        </div>
    )
}

export default Rating;