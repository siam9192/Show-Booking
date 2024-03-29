import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './ShowDetails.css'
import { Link, useParams } from 'react-router-dom';
import { BsClockHistory } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import Rating from 'react-rating';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoStarHalfOutline } from "react-icons/io5";
import WidthContainer from '../../Components/WidthContainer/WidthContainer';
import BookingForm from '../../Components/BookingForm/BookingForm';
import { Toaster } from 'react-hot-toast';
const ShowDetails = () => {
    const [show,setShow] = useState({})
    const [isBookingForm,setIsBookingForm] = useState(false);
    const {id} = useParams();
    const summaryRef = useRef();

  
    useEffect(()=>{
        axios.get('https://api.tvmaze.com/search/shows?q=all')
        .then(res =>{
            const data = res.data;
            const findShow = data.find(item=> item.show.id === parseInt(id))
            setShow(findShow)
          
           summaryRef.current.innerHTML = `${findShow.show.summary}`
           window.scrollTo(0,0)
        })
    },[])
    const handleBookingForm = (value)=>{
        setIsBookingForm(value)
    }

    console.log('show',show?.show?.webChannel)
    
    return (
        <div className='details-main-container'>
       <WidthContainer>
       <div className='details-container'>
              <div className='image-container'>
              <img src={show?.show?.image ? show?.show?.image.original||show?.show?.image.medium: ''} alt={show?.show?.name} />
              <button className='book-ticket-btn' onClick={()=>handleBookingForm(true)}>Book Ticket</button>
              </div>

                <div className='main-details'>
                    <h1>{show?.show?.name}</h1>
                    <div className='details-extra-info'>
                    <div className='show-type'>{show?.show?.type}</div>
                    <div className='show-language'>{show?.show?.language}</div>
                </div>
      {
        show?.show?.rating.average &&     <div className='rating-container'>
        <div>
        <Rating
        stop={10}
  initialRating={show?.show?.rating.average}
  emptySymbol={<IoStarHalfOutline className='icon-rating'></IoStarHalfOutline> }
  fullSymbol={<MdOutlineStarPurple500 className='icon-rating'></MdOutlineStarPurple500>}
  readonly
/>
        </div>
        <h4 className='rating-point'><span>{show?.show?.rating.average}</span> Out of 10</h4>
          </div>
      }
                    <p ref={summaryRef}></p>
                    <div >
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{color:'#dd003f', fontSize:'20px', marginTop:'4px'}}><BsClockHistory></BsClockHistory>  </div> <h4 className='schedule-heading'>Schedule:</h4>
                  </div>
                        <div className='schedule-container'>
                            {
                                show?.show?.schedule.days.map((item,index)=> <div className='schedule'>{item}</div>)
                            }
                        </div>
                        <h4 className='schedule-time'><span>Time</span> : {show?.show?.schedule.time||'N/A'}</h4>
                    </div>
                    
                  <div>
                  <div style={{display:'flex',justifyItems:'center',alignItems:'center',gap:'12px'}}>
                  <div style={{color:'#dd003f', fontSize:'20px',marginTop:'8px'}}><FaInfoCircle></FaInfoCircle>  </div> <h4 style={{fontSize:'22px'}}>More Information:</h4>
                  </div>
                  <div className='more-information-container'>
                  <div className='network'><h5>Genres:</h5>
                    <div className='genres-container'>
                     {
                     show?.show?.genres.map((item,index)=><div className='genres'>
                          {item}
                     </div>)
                     } 
                    </div>
                    </div>
                  {
                    show?.show?.webChannel &&
                    <div className='web-channel-container'><h5>Web channel:</h5>
                    <div className='web-channel'>
                   {/* {
                    show?.show?.webChannel.id &&  <h6>Id : {show?.show?.webChannel?.id}</h6>
                   } */}
                   {
                    show?.show?.webChannel.name &&  <h6><span>Name </span> : {show?.show?.webChannel?.name}</h6>
                   }
                    {
                    show?.show?.webChannel.officialSite && <a href={show?.show?.webChannel?.officialSite} target='_blank' style={{color:'blue'}}>Site</a>
                   }
                    </div>
                    </div>
                  }
                    <div className='network'><h5>Network:</h5>
                    <div className='network-details-container'>
                       <h4> <span>Name</span>: {show?.show?.network?.name||'N/A'}</h4>  <h4> <span>Country</span>: {show?.show?.network?.country.name||'N/A'}</h4>
                       <h4> <span>Code</span>: {show?.show?.network?.country.code||'N/A'}</h4>
                       <h4> <span>Timezone</span>: {show?.show?.network?.country.timezone||'N/A'}</h4>
                    </div>
                    </div>
                    
                   
                    <div className='web-channel-container'><h5>Externals:</h5>
                    <div className='web-channel'>
                   {/* {
                    show?.show?.webChannel.id &&  <h6>Id : {show?.show?.webChannel?.id}</h6>
                   } */}
                     <h6><span>Tbrage </span> : {show?.show?.externals?.tbrage||'N/A'}</h6>
                     <h6><span>The Tv Db </span> : {show?.show?.externals?.thetvdb||'N/A'}</h6>
                     <h6><span>Imdb </span> : {show?.show?.externals?.imdb||'N/A'}</h6>
                   
                
                    </div>
                    </div>
                  
                  </div>
                  </div>

                </div>
                
            </div>
            
       </WidthContainer>
    <BookingForm isBookingForm={isBookingForm} handleBookingForm={handleBookingForm} show={show}></BookingForm>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
    );
}

export default ShowDetails;
