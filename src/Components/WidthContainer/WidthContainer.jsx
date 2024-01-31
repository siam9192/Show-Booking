import React from 'react';
import './WidthContainer.css'
const WidthContainer = ({children}) => {
    return (
        <div className='width-container'>
            {children}
        </div>
    );
}

export default WidthContainer;
