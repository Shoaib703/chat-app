import Chat from './chats.jsx'
import { useState, useEffect } from 'react'
import {Navig} from './home.jsx'
import {useAuth} from './AuthContext.jsx'


const Chatsfromback = () => {
    const handleclick=Navig();

    // const auth=useAuth()
 
    const user=auth.user
    const [conversations, setconversation] = useState([])
    

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch("http://localhost:8000/api/v2/conversations/getmyconversation",
                {
                    method: "GET",
                
                    credentials:'include'
                })

            const data = await res.json()

            setconversation(data.data.conversations);
        };
        fetchdata();
    },[]);



    return (
           <div>
            {conversations.map((convo)=>{
                const x=convo.participants.find(p=>p._id.toString()!==user);
                 
                return (
                    <Chat onClick={()=>handleclick(convo._id,user)} style={{cursor:"pointer"}}
                    key={convo._id}
                    Userid ={x.username}
                    Last_message={"this is the last message"}
                    />

                )
            })}
            </div>
        
        )

}


export default Chatsfromback