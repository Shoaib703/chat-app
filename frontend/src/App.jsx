import React from 'react';
import './App.css'
import Msgs from './MessageWindow.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './home.jsx'
import Signup from './signup.jsx'
import Login from './login.jsx'

const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {path:"/home",
      element:<Home/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {path:"/msg/:convo_id/:user",
      element:<Msgs/>
    },
  ])
function App(){
  
  return <>
  < RouterProvider router={router}/>
  </>
}


export default App