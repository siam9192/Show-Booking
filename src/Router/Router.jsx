import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Routes from '../Routes/Routes';
import Home from '../Pages/Home/Home';
import ShowDetails from '../Pages/ShowDetails/ShowDetails';

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Routes></Routes>,
        children:[{
            path:'/',
            element:<Home></Home>
        },{
            path:'/show/details/:id',
            element:<ShowDetails></ShowDetails>
        }]
    
    }
])

export default Router;
