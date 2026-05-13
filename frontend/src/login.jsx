import { useNavigate } from 'react-router'
import './App.css'
import {useState} from 'react'
// import { json } from 'body-parser'
import {useAuth} from './AuthContext.jsx'

function Login(){
    const navigate  =useNavigate()
    const {login}=useAuth()

      const [form,setform]=useState({phone:"",email:"",password:""})
        const[error,seterror]=useState(null)


    const HandleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }

        const handledata=async()=>{
         
            try{
                const res=await fetch("http://localhost:8000/api/v2/users/loginUser",
                    {
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        credentials:'include',
                        body:JSON.stringify({
                            email:form.email,
                            phone:form.phone,
                            password:form.password
                        })
                    }
                )

                const disp=await res.json()
                
                if(!res.ok){
                   
                    throw new Error(disp.message||"something is not right")
                }
                login(disp.data.user._id)
                   
                navigate("/home")
            }
            catch(err){
                 seterror(err.message)

            }
        }

        const movtosignup=()=>{
            navigate(`/signup`)
        }

    return (
        <>
        <div className="login">
            <h1>This is login page</h1>

            <input type="number" name="phone" placeholder="Enter your phone no." onChange={HandleChange}/>

            <input type="text" name="email" placeholder="Enter email" onChange={HandleChange}/>

            <input type="password" name="password" placeholder="Enter password" onChange={HandleChange}/>

            <button name="enter" onClick={handledata}>Enter</button>

            {error && (
                <div role="alert" className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          ⚠ {error}
        </div>
        
            )}
        <div style={{display:"flex"}}>
            <p> don't have account</p>
            <p onClick={movtosignup} style={{cursor:"pointer", color:"blue"}}> Click here</p>
        </div>
        </div>

</>

    )
}




export default Login