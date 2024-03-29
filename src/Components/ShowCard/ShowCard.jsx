import React from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { HiStar } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
const ShowCard = ({show}) => {
    const navigate = useNavigate();
    
    const handleNavigate = (id)=>{
        navigate(`/show/details/${id}`)
    }

    console.log( show?.show?.webChannel)
    return (
        <div className='show-card'>
           <div className='show-card-image-container'>
           <img src={show.show.image?.original||show.show.image?.medium}    />
         {
            show.show.rating.average &&   <div className='show-card-ratting'><div><HiStar className='show-card-ratting-icon'></HiStar></div><h4>{show.show.rating.average||0}</h4></div>
         }
           </div>
            <div className='show-card-text-container'>
                <h3>{show.show.name}</h3>
                <div className='details-extra-info'>
                    <div className='show-type'>{show.show.type}</div>
                    <div className='show-language'>{show.show.language}</div>
                </div>
                <div className='show-card-button-container'>
                    <div className='show-card-status'>{''}</div>
                    <div className='btn' onClick={()=>handleNavigate(show.show.id)}><GoArrowUpRight ></GoArrowUpRight></div>
                </div>
            </div>
        </div>
    );
}

export default ShowCard;
