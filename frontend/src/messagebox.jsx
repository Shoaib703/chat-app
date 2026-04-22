export default function Msg({data,isUser}){
    return (
      <>{ isUser ?( <div className="msgsent" style={{width:"225px",
         height:"auto",
           backgroundColor:" #537091 ",
            border:"2px solid black",
            // display:"flex",
            // justifyContent:"flex-end"
            marginLeft:"auto"}}>
            {data}
        </div>)
        :
        (
        <div className="msgrecieved" style={{width:"225px",
            height:"auto",
            backgroundColor:"#462908",
            border:"2px solid black",
            marginRight:"auto"
        }}>
            {data}
        </div>
      
    )}

      </>
    )
}