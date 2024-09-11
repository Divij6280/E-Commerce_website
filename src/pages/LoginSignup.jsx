import React, { useState } from "react";
import './CSS/LoginSignup.css'
import { toast, ToastContainer } from 'react-toastify';


const LoginSignup=()=>{

    const [state,setState] = useState("Sign In");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const signin = async ()=>{
        console.log("Signin Function Executed",formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            toast.error(responseData.errors)
        }
    }

    const signup = async ()=>{
        console.log("Signup Function Executed",formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            toast.error(responseData.errors)
        }
        
    }

    return(

        <div className="bodylogin">
            <div className="container" id="container">
                <div className="form-container sign-in">
                    <form>
                        <h1>{state}</h1>
                        {state==="Sign Up"?<input name="username" value={formData.username}
                        onChange={changeHandler} type="text" placeholder="Enter Your Name" /> : <></>} 

                        <input name="email" value={formData.email} onChange={changeHandler} 
                        type="password" placeholder="Enter Your Email" />

                        <input name="password" value={formData.password} onChange={changeHandler}
                        type="email" placeholder="Enter Your Password" />

                        <button onClick={()=>{state==="Sign Up"?signup():signin()}}>{state}</button>

                    </form>
                </div>


                <div className="toggle-container">
                    <div className="toggle">
                        {state === "Sign Up" ?
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of the site features</p>
                                <button className="hidden" id="login" onClick={()=>{setState("Sign In")}}>Sign In</button>
                            </div>
                        :
                            <div className="toggle-panel toggle-right">
                                <h1>Hello,Friends</h1>
                                <p>Register your personal details to use all of the site features</p>
                                <button className="hidden" id="login" onClick={()=>{setState("Sign Up")}}>Sign Up</button>
                            </div>
                        }
                        
                    </div>
                </div>

                <ToastContainer position="top-center"/>
            </div> 
        </div>
        
    )
}
export default LoginSignup