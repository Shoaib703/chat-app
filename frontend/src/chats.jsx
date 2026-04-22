import './App.css'
export default function Chat({Userid,Last_message,onClick,style}){
    return (
        <div className="chat" onClick={onClick} style={style}>
       <h3>{Userid}</h3>
        <p>{Last_message}</p>
        </div>
    )
}