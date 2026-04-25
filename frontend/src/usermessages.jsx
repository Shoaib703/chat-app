import { useAuth } from './AuthContext.jsx';
import {useEffect,useState} from 'react'
import Msg from './messagebox.jsx'
const Usermessages=({convoid,user})=>{
    const x=(convoid);
    const [messages,setmessages]=useState([])
    const auth=useAuth()
    const accesstoken=auth.accesstoken
    console.log("usermessages:", accesstoken)
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