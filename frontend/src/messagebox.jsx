export default function Msg({data,isUser}){
    return (
      <>{ isUser ?( <div className="msgsent" style={{width:"225px",
         height:"auto",
           backgroundColor:"oklch(37.3% 0.034 259.733) "
           ,color:"white",
            border:"2px solid black",
            marginLeft:"auto"}}>
            {data}
        </div>)
        :
        (
        <div className="msgrecieved" style={{width:"225px",
            height:"auto",
            backgroundColor:"oklch(55.2% 0.016 285.938)",
            border:"2px solid black",
            marginRight:"auto"
        }}>
            {data}
        </div>
      
    )}

      </>
    )
}