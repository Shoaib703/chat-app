import React from 'react';
import './App.css'
import Msgs from './MessageWindow.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './home.jsx'


function App(){
  
  const router=createBrowserRouter([
    {path:"/",
      element:<Home/>
    },
    {path:"/msg/:convo_id",
      element:<Msgs/>
    },
  ])
  return <>
  < RouterProvider router={router}/>
  </>
}


export default App