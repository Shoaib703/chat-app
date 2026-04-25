import { useState } from 'react'
import './App.css'
import {useAuth} from './AuthContext.jsx'
  import Chatsfromback from './chatsfromback.jsx'
       
        export default function Addcontact({ setIsOpen }) {
            const auth=useAuth()
            const accesstoken=auth.accesstoken
            console.log("adddcontact : ",accesstoken);
    const [userId, setUserId] = useState("");

    const handleSubmit =async () => {
        const formdata= new FormData();
        formdata.append("reciever_id",userId);
        
        const response= await fetch("http://localhost:8000/api/v2/conversations/start_privateconversation",{
            method:"POST",
           headers: {
            Authorization:`Bearer ${accesstoken}`
            },
            body:formdata
        });

      
       
        setIsOpen(false);
        
    }

    return (
        <div className="panel open">
            <h3>Add Contact</h3>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
            />
            <button onClick={handleSubmit}>Enter</button>
        </div>
    );
}