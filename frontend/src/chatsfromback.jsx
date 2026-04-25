import Chat from './chats.jsx'
import { useState, useEffect } from 'react'
import {Navig} from './home.jsx'
import {useAuth} from './AuthContext.jsx'


const Chatsfromback = () => {
    const handleclick=Navig();

    const auth=useAuth()
    const accesstoken=auth.accesstoken
    const user=auth.user
      console.log("chatsfromback",accesstoken)
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
                const x=convo.participants.find(p=>p!==user);

                return (
                    <Chat onClick={()=>handleclick(convo._id,user)} style={{cursor:"pointer"}}
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