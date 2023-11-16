  import React, { useState } from 'react';
  import './login.css'

import googleimg from './googleimg.png'; 
import githubimg from './githubimg.png';
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCard,
  MDBCardBody
}
from 'mdb-react-ui-kit';
import {  Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,provider } from './firebase/FirebaseConfig';
import {signInWithPopup,GithubAuthProvider} from "firebase/auth"

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [verificationError,setverificationError]=useState('');
  const navigate=useNavigate()

  const Login=async ()=>{
    if (email==="" || password===""){
      setverificationError("Please Fill all the fields")
    }
    else{
      try{
        const user=await signInWithEmailAndPassword(auth,email,password);
        const users=localStorage.setItem('user',JSON.stringify(user));
        alert("Login SuccessFully");
        setEmail("");
        setPassword("");
        setverificationError("");
       

        navigate('/');
      }
      catch (error){
        if (error.code==="auth/network-request-failed"){
          setverificationError("Check your netwrok connection")
        }
        else if(error.code==="auth/invalid-login-credentials"){
          setverificationError("Check your email and password")
        }
        else if(error.code==="auth/invalid-email"){
          setverificationError("Invalid Email");
        }
        else  {
          setverificationError("An Error accured");
          console.log(error);
        }
      }
    }
  }
  const SignUpWithGoogle=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      localStorage.setItem("user",JSON.stringify(data.user.email));
      navigate("/");
    })
      }
  const SignUpWithGithub=()=>{
    signInWithPopup(auth,new GithubAuthProvider()).then((data)=>{
      localStorage.setItem('user',JSON.stringify(data));
      console.log(data.user.displayName)
      navigate("/")
    }).catch((error)=>{
      console.log(error);
    })
  }
  
     
  return (
    <>
     <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <p className="text-white-50 mb-5">Please enter your login and password! </p>
        <p className=" mb-5" style={{color:"red"}}>{verificationError}</p>

        <MDBInput wrapperClass='mb-4 mx-5 w-100'autoComplete='off' labelClass='text-white' label='Email address' id='emai' type='email' size="lg" value={email}
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <MDBInput wrapperClass='mb-4 mx-5 w-100'  labelClass='text-white' label='Password' id='password' type='password' size="lg" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/>


        <p className="small mb-3 pb-lg-2"><Link class="text-white-50"  to={'/resetpassword'}>Forgot password?</Link></p>
      
        <button className='login-btn' onClick={Login}>Login</button>
<div className='d-flex justify-content-center mt-3 mb-5'>
        <img  onClick={SignUpWithGoogle} src={googleimg} alt="aimage..." style={{height:"20%",width:"20%",alignItems:"center",justifyContent:"center",cursor:"pointer"}} />
        <img onClick={SignUpWithGithub} src={githubimg} alt="aimage..." style={{height:"20%",width:"20%",alignItems:"center",justifyContent:"center",cursor:"pointer",
        background:"white",borderRadius:"50%",marginLeft:"7%"}} />
         </div>

       

        <div>
          <p className="mb-0">Don't have an account? <Link to={'/Signup'}>Signup</Link></p>   

        </div>
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>

   </>
  )
}
