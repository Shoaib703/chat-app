import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import Login from './login.jsx'
function Signup() {
    const navigate = useNavigate()

    const [form, setform] = useState({
        email: "",
        phone: "",
        username: "",
        password: "",
        confpassword: ""
    });

    const [coverimage, setcoverimage] = useState(null)

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const [erro, seterro] = useState(null);
    const handledata = async () => {

        if (form.password !== form.confpassword) {
            // alert("password and confirm password  should be same")
            seterro("password and confirm password should be same")
            setform(prev => ({ ...prev, password: "", confpassword: "" }))
            return;
        }


        const data = new FormData()

        data.append("email", form.email)
        data.append("phone", form.phone)
        data.append("username", form.username)
        data.append("password", form.password)

        data.append("coverimage", coverimage)



        try {
            const res = await fetch("http://localhost:8000/api/v2/users/register",
                {
                    method: "POST",
                    body: data
                }
            )

            const disp = await res.json();
            if (!res.ok) {
                throw new Error(disp.message);

            }

            navigate(`/`)

        }
        catch (err) {

            seterro(err.message);
        }



    }

    const movtologin =()=> {
        navigate(`/`)
    }
    return (
        <>
            <h1> this is the signup page</h1>

            <div className="main">
                <input type="text" name="email" placeholder="enter your email" onChange={handlechange} />

                <input type="number" name="phone" placeholder="enter you phone no." onChange={handlechange} />

                <input type="text" name="username" placeholder="enter your username " onChange={handlechange} />

                <input type="file" name="coverimage" accept='image/*' placeholder="your coverimage" onChange={(e) => setcoverimage(e.target.files[0])} />

                <input type="password" name="password" placeholder="enter password" onChange={handlechange} />

                <input type="password" name="confpassword" placeholder="confirm password" onChange={handlechange} />

                <button onClick={handledata}>Submit</button>

                {erro && (
                    <div role="alert" className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                        ⚠ {erro}
                    </div>

                )}
            <div style={{ display: "flex" ,margin:"0.1px" }}>
                <p>Already have account</p>
                <p onClick={movtologin} style={{ cursor: "pointer",color:"blue" }}> Click here</p>
            </div>
            </div>


        </>
    )
}

export default Signup