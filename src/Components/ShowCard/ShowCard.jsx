import React from 'react';
import { GoArrowUpRight } from "react-icons/go";
const ShowCard = ({show}) => {
    return (
        <div className='show-card'>
           <div className='show-card-image-container'>
           <img src={show.show.image?.original||show.show.image?.medium}   />
           </div>
            <div className='show-card-text-container'>
                <h3>{show.show.name}</h3>
                <div className='show-cart-extra-info'>
                    <div className='show-type'>{show.show.type}</div>
                    <div className='show-language'>{show.show.language}</div>
                </div>
                <div className='show-card-button-container'>
                    <button><GoArrowUpRight></GoArrowUpRight></button>
                </div>
            </div>
        </div>
    );
}

export default ShowCard;
