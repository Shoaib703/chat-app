import { useState } from 'react'
import './App.css'
        // this is for the time being "testing"
       const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWU3MjgxZjgzYWEzOGEyN2M4NDJkY2MiLCJlbWFpbCI6Imxhc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJsYXN0IiwicGhvbmUiOjk4NzY1NDEwMDEsImlhdCI6MTc3Njg3NTkwMSwiZXhwIjoxNzc2OTYyMzAxfQ.FLZrDDtH1pC-YUX_F2y4RHdzAzs1pZAVDJIv-EiVtYs"
        // console.log(accesstoken);
        export default function Addcontact({ setIsOpen }) {
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