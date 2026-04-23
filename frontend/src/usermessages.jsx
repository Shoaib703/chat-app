
import {useEffect,useState} from 'react'
import Msg from './messagebox.jsx'
const Usermessages=({convoid,user})=>{
    const x=(convoid);
    const [messages,setmessages]=useState([])
    const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWU3MjgxZjgzYWEzOGEyN2M4NDJkY2MiLCJlbWFpbCI6Imxhc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJsYXN0IiwicGhvbmUiOjk4NzY1NDEwMDEsImlhdCI6MTc3Njg3NTkwMSwiZXhwIjoxNzc2OTYyMzAxfQ.FLZrDDtH1pC-YUX_F2y4RHdzAzs1pZAVDJIv-EiVtYs"
    useEffect(()=>{
        const fetchmsg=async()=>{
            
            const res=await fetch(`http://localhost:8000/api/v2/messages/getmessages/${x}`,
            {method:"GET",
                headers:{
                    Authorization:`Bearer ${accesstoken}`
                }
            }
        )

        const data=await res.json();

        setmessages(data.data.messages);
        };

        fetchmsg();
    },[])

    return (
        <div>
            {
                messages.map((msg)=>{
                    return (
                        <Msg 
                        key={msg._id}
                        data={msg.message}
                        isUser={user===msg.sender}
                        />
                    )
                })
            }
        </div>
    )
}


export default Usermessages