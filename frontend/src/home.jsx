import './App.css'
import Chat from './chats.jsx'
import {useState} from 'react'
import Addcontact from './adddcontact.jsx'
import Chatsfromback from './chatsfromback.jsx'
import {useNavigate} from "react-router-dom"

import { createBrowserRouter,RouterProvider } from 'react-router'

function Searchbar(){
    return(<div className="searchbar">
   
            <textarea placeholder="search for ...."></textarea>

            <button type="submit">search</button>

        </div>
    )
}
const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWU3MjgxZjgzYWEzOGEyN2M4NDJkY2MiLCJlbWFpbCI6Imxhc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJsYXN0IiwicGhvbmUiOjk4NzY1NDEwMDEsImlhdCI6MTc3Njc3ODgyMSwiZXhwIjoxNzc2ODY1MjIxfQ.WKwTioZ0f-rjFoWrQ8mj1B-2KEIoAqrTfE-tBnCbw00"






function Chats(){
    return (
        <>
        <h1> this is chat area</h1>
        <Chatsfromback/>
        </>
    )
}


function Addchat() {
    const [isopen, stisopen] = useState(false);

    return (
        <>
            <button
                onClick={() => stisopen(true)}
                style={{ position: "fixed", bottom: "15px", right: "15px" }}
            >
                Add Contact
            </button>

            {isopen && <Addcontact setIsOpen={stisopen} />}
        </>
    );
}


// function Handleclick(){
//     const [convoid,setconvoid]=useState("");

//         return (
//             <>
//             setconvoid(convo_.id);
            
//             const router=createBrowserRouter([
//                 path:"/msg",
//                 element:<Msgs convoid={convoid}/>
//             ]) 
            

//             <RouterProvider router={router}/>
//             </>
//         )
// }




export function Navig(){
    const navigate=useNavigate();

    const handleclick=(convo)=>{
        // console.log(convo);
        navigate(`/msg/${convo}`);
        
    }
    return handleclick;
}

function Home(){
    return (
        <>
        <Searchbar/>
        <Chats/>
        <Addchat/>
        </>
    )
}


export default Home