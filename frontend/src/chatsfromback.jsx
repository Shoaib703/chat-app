import Chat from './chats.jsx'
import { useState, useEffect } from 'react'
import {Navig} from './home.jsx'


const currentuser='69e7281f83aa38a27c842dcc'
const Chatsfromback = () => {
    const handleclick=Navig();
    const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWU3MjgxZjgzYWEzOGEyN2M4NDJkY2MiLCJlbWFpbCI6Imxhc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJsYXN0IiwicGhvbmUiOjk4NzY1NDEwMDEsImlhdCI6MTc3Njg3NTkwMSwiZXhwIjoxNzc2OTYyMzAxfQ.FLZrDDtH1pC-YUX_F2y4RHdzAzs1pZAVDJIv-EiVtYs"
    const [conversations, setconversation] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch("http://localhost:8000/api/v2/conversations/getmyconversation",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accesstoken}`
                    }
                })

            const data = await res.json()
                // console.log(data.data.conversations[0].participants);
            setconversation(data.data.conversations);
        };
        fetchdata();
    },[]);

    // console.log(conversations)

    return (
           <div>
            {conversations.map((convo)=>{
                const x=convo.participants.find(p=>p!==currentuser);

                return (
                    <Chat onClick={()=>handleclick(convo._id,currentuser)} style={{cursor:"pointer"}}
                    key={convo._id}
                    Userid ={x}
                    Last_message={"this is the last message"}
                    />

                )
            })}
            </div>
        
        )

}


export default Chatsfromback