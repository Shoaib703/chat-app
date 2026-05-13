import './App.css'
import Chat from './chats.jsx'
import {useState} from 'react'
import Addcontact from './adddcontact.jsx'
import Chatsfromback from './chatsfromback.jsx'
import {useNavigate} from "react-router-dom"
import {useAuth} from'./AuthContext.jsx'
// import { createBrowserRouter,RouterProvider } from 'react-router'

function Searchbar(){
    return(<div className="searchbar">
   
            <textarea placeholder="search for ...."></textarea>

            <button type="submit">search</button>

        </div>
    )
}


function Chats(){

    return (
        <div style={{scroll:"auto"}}>
        <h1> this is chat area</h1>
        <Chatsfromback/>
        </div>
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

    const handleclick=(convo,user)=>{
        navigate(`/msg/${convo}/${user}`);
        
    }
    return handleclick;
}

function Home(){
    // const auth=useAuth()

    return (
        <>
        <Searchbar/>
        <Chats/>
        <Addchat/>
        </>
    )
}


export default Home