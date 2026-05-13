import React from 'react';
import './App.css'
import Msg from './messagebox.jsx'
import {useParams} from "react-router-dom"

import Usermessages from './usermessages.jsx';
import {socket} from './socket.js'

 import {useEffect,useState,useRef} from 'react'






function Top_bar({convo_id}){
  return (
    <div className="topbar">
      
      <div className="left_top">
    this is for profile picture.
      </div>
      <div className="right_top">
        {convo_id}
      </div>
    </div>
  )
}

function Centre({convo_id,user,msg}){
  const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [msg]);
  return (
    <div className="msgarea">
        
      <Usermessages convoid={convo_id} user={user}/>
     
     {msg.map((m,index)=>(
      <Msg key={index} data={m.mssg} isUser={m.sender===user}/>
   
  ))

}
 <div ref={bottomRef} />
</div> 
) } 


function Bottom_bar({convo_id,user}){
  function sendmsg(){
  const data= document.getElementById("message");
 socket.emit("send-message",data.value);
    data.value="";
}
  return (
    <div className="contentarea">
      <div className="msg">
      <textarea  placeholder="enter message here" id="message"></textarea>
    </div>

    <div className="send">
    <button onClick={()=>sendmsg()} type="submit" >Enter</button>
    </div>
    </div>
  )
}


function Msgs(){
  const {convo_id,user}=useParams();
  
const [msg,setmsg]=useState([])




useEffect(()=>{

  socket.connect();

 if (socket.connected) {
        socket.emit("join-room", { convo_id });
    }

socket.on("connect",()=>{
    socket.emit("join-room",{convo_id});
})



socket.on("newmsg",({mssg,sender})=>{
  setmsg(prev=>[...prev,{mssg,sender}]);

})


return ()=> {
  socket.off("connect");
  socket.off("newmsg");
  socket.disconnect();
};
},[convo_id]);
  

  return (
  <>
  <Top_bar convo_id={convo_id}/>
    <Centre convo_id={convo_id} user={user} msg={msg}/>
  <Bottom_bar convo_id={convo_id} user={user} />
  
  </>
  )
}

export default Msgs
