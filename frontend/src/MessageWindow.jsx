import React from 'react';
import './App.css'
import Msg from './messagebox.jsx'
import {useParams} from "react-router-dom"


 




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

function Centre(){
  return (
    <div className="msgarea">
      <h1>this is the message area</h1>
      <Msg data={Data} isUser={true}/>
      <Msg data={"this is the reciever side"} isUser={false}/>
      
    </div>
  )
}


function Bottom_bar(){
  return (
    <div className="contentarea">
      <div className="msg">
      <textarea  placeholder="enter message here" ></textarea>
    </div>

    <div className="send">
    <button type="submit" >Enter</button>
    </div>
    </div>
  )
}


function Msgs(){
  const convoid=useParams();
  // console.log(convoid);



  return (
  <>
  <Top_bar/>
    <Centre />
  <Bottom_bar/>
  </>
  )
}

export default Msgs
