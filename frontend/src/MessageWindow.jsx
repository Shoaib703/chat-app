import React from 'react';
import './App.css'
import Msg from './messagebox.jsx'
import {useParams} from "react-router-dom"

import Usermessages from './usermessages.jsx';
import {socket} from './socket.js'

 import {useEffect,useState} from 'react'




var Data="this is temp data"


function Top_bar(){
  return (
    <div className="topbar">
      
      <div className="left_top">
    this is for profile picture.
      </div>
      <div className="right_top">
        this is for email or number or username.
      </div>
    </div>
  )
}

function Centre({convo_id,user,msg}){
  //  console.log(msg);
  return (
    <div className="msgarea">
      <h1>this is the message area</h1>
      <Msg data={Data} isUser={true}/>
      <Msg data={"this is the reciever side"} isUser={false}/>
          {/* console.log(convo_id); */}
      <Usermessages convoid={convo_id} user={user}/>
     
     {msg.map((m,index)=>(
      <Msg key={index} data={m.mssg} isUser={m.sender===user}/>
    
  ))

}
</div> 
) } 


function Bottom_bar({convo_id,user}){
  function sendmsg(){
  const data= document.getElementById("message");
  // console.log(data.value);
 socket.emit("send-message",data.value,convo_id,user);
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
        //  console.log(convo_id);
    //  console.log(user)
  
const [msg,setmsg]=useState([])




useEffect(()=>{



socket.on("connect",()=>{
    // console.log("connected",socket.id);
    socket.emit("join-room",{convo_id});
})



socket.on("newmsg",({mssg,sender})=>{
  //  console.log(mssg)
  //  console.log(sender)
  setmsg(prev=>[...prev,{mssg,sender}]);

})


return ()=> {
  socket.off("connect");
  socket.off("newmsg");
}
},[convo_id]);
  

  return (
  <>
  <Top_bar/>
    <Centre convo_id={convo_id} user={user} msg={msg}/>
  <Bottom_bar convo_id={convo_id} user={user} />
  
  </>
  )
}

export default Msgs
