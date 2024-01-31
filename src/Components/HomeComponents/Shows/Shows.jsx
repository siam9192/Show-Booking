import React, { useEffect, useState } from 'react';
import './shows.css'
import WidthContainer from '../../WidthContainer/WidthContainer';
import axios from 'axios';
import ShowCard from '../../ShowCard/ShowCard';
const Shows = () => {
    const [shows,setShows] = useState([])
    useEffect(()=>{
        axios.get('https://api.tvmaze.com/search/shows?q=all')
        .then(res =>setShows(res.data))
    },[])
   
    return (
        <WidthContainer>
            <div className='shows-container'>
       <h1>Available Shows</h1>
       <div className='shows-card-container'>
        {
            shows.map((show,index)=>{
                return <ShowCard show={show} key={index}></ShowCard>
            })
        }
       </div>
            </div>
            </WidthContainer>
    );
}

export default Shows;
