export default function Msg({data}){
    return (
        <div className="msgsent" style={{width:"225px",
         height:"auto",
           backgroundColor:" #537091 ",
            border:"2px solid black",
            // display:"flex",
            // justifyContent:"flex-end"
            marginLeft:"auto"}}>
            {data}
        </div>
    )
}