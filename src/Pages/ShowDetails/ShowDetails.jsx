import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './ShowDetails.css'
import { useParams } from 'react-router-dom';
import { BsClockHistory } from "react-icons/bs";

const ShowDetails = () => {
    const [show,setShow] = useState({})
    const {id} = useParams();
    const summaryRef = useRef();
  
    useEffect(()=>{
        axios.get('https://api.tvmaze.com/search/shows?q=all')
        .then(res =>{
            const data = res.data;
            const findShow = data.find(item=> item.show.id === parseInt(id))
            setShow(findShow)
            summaryRef.current.innerHTML = `${findShow.show.summary}`
        })
    })
    return (
        <div className='details-main-container'>
            <div className='details-container'>
              <div className='image-container'>
              <img src={show?.show?.image.original} alt="" />
              <button className='book-ticket-btn'>Book Ticket</button>
              </div>

                <div className='main-details'>
                    <h1>{show?.show?.name}</h1>
                    <div className='details-extra-info'>
                    <div className='show-type'>{show?.show?.type}</div>
                    <div className='show-language'>{show?.show?.language}</div>
                </div>
                    <p ref={summaryRef}>{show?.show?.summary}</p>
                    <div >
                  <div style={{display:'flex',justifyItems:'center',gap:'12px'}}>
                  <div style={{color:'#dd003f', fontSize:'20px'}}><BsClockHistory></BsClockHistory>  </div> <h4>Available Schedule</h4>
                  </div>
                        <div className='schedule-container'>
                            {
                                show?.show?.schedule.days.map((item,index)=> <div className='schedule'>{item}</div>)
                            }
                        </div>
                        <h4 className='schedule-time'><span>Time</span> : {show?.show?.schedule.time}</h4>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ShowDetails;
