import React from 'react';
import './login.css'

import googleimg from './googleimg.png';
import githubimg from './githubimg.png';
import {
MDBContainer,
MDBCol,
MDBRow,

MDBInput,
MDBCard,
MDBCardBody
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth,provider } from './firebase/FirebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { createUserWithEmailAndPassword ,GithubAuthProvider} from 'firebase/auth';

export default function Signup() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [verificationError,setverificationError]=useState('');
    const navigate=useNavigate();

    console.log("This is user's email",email, password);
    const SignUp=async()=>{
      if (email==="" || password===""){
        setverificationError("Please Fill all the fields")
      }
      else{
        try{
          const user=await createUserWithEmailAndPassword(auth,email,password);
          localStorage.setItem("user",JSON.stringify(user));
          setverificationError("")

         alert("Signup Successfull")
         setEmail("");
         setPassword("");
         navigate("/");
        }
        catch (error){
          if(error.code === 'auth/email-already-in-use'){
            setverificationError("Email is already used")
          }
          else if(error.code==="auth/network-request-failed"){
            setverificationError("Check your netwrok connection")
          }
          else{  
             console.log("theerroris",error);
             setverificationError("An Error accured")
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

      <h2 className="fw-bold mb-2 ">Signup</h2>
      <p className="text-white-50 mb-5">Please enter your login and password!</p>
      <p className=" mb-5" style={{color:"red"}}>{verificationError}</p>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete='off' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" value={password}
       onChange={(e)=>{setPassword(e.target.value)}}/>

      {/* <MDBBtn outline className='mx-2 px-5'  size='lg' onClick={SignUp}>
        Signup
      </MDBBtn> */}



<button className='login-btn' onClick={SignUp}>SignUp</button>



      <div className='d-flex justify-content-center mt-3 mb-5'>
        <img as={Link} onClick={SignUpWithGoogle} src={googleimg} alt="aimage" style={{height:"20%",width:"20%",alignItems:"center",justifyContent:"center",cursor:"pointer"}} />
        <img as={Link} onClick={SignUpWithGithub} src={githubimg} alt="aimage..." style={{height:"20%",width:"20%",alignItems:"center",justifyContent:"center",cursor:"pointer",
        background:"white",borderRadius:"50%",marginLeft:"7%"}} />
      </div>

      <div>
        <p className="mb-0"> have an account? <Link to={'/'}>Login</Link></p>

      </div>
    </MDBCardBody>
  </MDBCard>

</MDBCol>
</MDBRow>

</MDBContainer>

  </>
)
}
