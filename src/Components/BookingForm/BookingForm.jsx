import React, { useEffect, useRef } from 'react';
import './BookingForm.css'
import toast, { Toaster } from 'react-hot-toast';
const BookingForm = ({isBookingForm,show,handleBookingForm}) => {
   const formRef = useRef(null);
   const handler = (event)=>{
    
    if (formRef.current && !formRef.current.contains(event.target)) {
        // Click occurred outside the component, close it
      handleBookingForm(false)
      }
   }

   useEffect(()=>{

    document.addEventListener('mousedown',handler)

    return ()=>{
        document.removeEventListener('mousedown',handler)
    }
   },[])

    const handleBookingSubmit = (e)=>{
        e.preventDefault();
       const  form = e.target;
        const showId = show.show.id;
        const schedule = form.schedule.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            showId,
            schedule,
            name,
            email,
            phone
        }
        if(!schedule){
        toast.error('Please select your schedule')
        return
        }
        let previousBooking = localStorage.getItem('Bookings')||[]
        if(previousBooking.length !== 0){
          previousBooking = JSON.parse(previousBooking)
        }
        console.log(previousBooking)
        const arr = previousBooking;
        arr.push(booking)
      
        localStorage.setItem('Bookings',JSON.stringify(arr))
        toast.success("Booking Successful")
        handleBookingForm(false)

    }

    console.log(isBookingForm)
    return (
        <div className={` ${isBookingForm ? 'booking-form-container' : 'booking-form-hidden'}`}>
         <form className='booking-form' onSubmit={handleBookingSubmit} ref={formRef}>
      <div className='booking-form-img-container'>
      <img src="/Images/book.png" alt="" className='book-img' />
      </div>
        <div className='booking-styled-text'>Booking</div>
        <div className='booking-details-container'>
            <h1 >{show?.show?.name}</h1>
            <div className='details-extra-info'>
                    <div className='show-type'>{show?.show?.type}</div>
                    <div className='show-language'>{show?.show?.language}</div>
                </div>

                <div className='booking-form-input-container'>
                   <select name="schedule" id="" defaultChecked>
                    <option value="">Select Schedule</option>
                    {
                        show?.show?.schedule?.days.map((item,index)=><option value={item} key={index}>{item}</option>)
                    }
                   </select>
                   <input type="text" name='name'  className='' placeholder='Your Full Name' required/>
                   <input type="text" name='email' className='' placeholder='Email' required/>
                   <input type="text" name='phone' className='' placeholder='Phone' required/>
                </div>

                <div className='booking-btn-container'>
                    <button type='submit'>Confirm Booking</button>
                </div>
                <div>

                </div>
        </div>
         </form>
      
        </div>
    );
}

export default BookingForm;
