import React from 'react'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
    MDBCard,
    MDBCardBody
    }
    from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase/FirebaseConfig';
export default function ResetPassword() {
    const [email,setEmail]=useState('');
    const [verificationError,setverificationError]=useState('');
    const forgotPassword=()=>{
          if (email===""){
            setverificationError("Please Enter your email");
          }
          else{
            sendPasswordResetEmail(auth,email).then(data=>{
                alert ("please check your Email");
            }).catch(error=>{
                if(error.code==="auth/invalid-email"){
                    setverificationError("Please Enter a valid Email");
                    console.log(error);

                }
                else{
                    console.log(error);

                }
            })

          }
    }
  return (
  <>
   <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
<MDBCol col='12'>

  <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
    <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

    <h3 className="fw-bold mb-5 ">Reset Your Password</h3>
      <p className="text-white-50 mb-5">Please enter your email</p>
      <p className=" mb-5" style={{color:"red"}}>{verificationError}</p>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete='off' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
  

      <MDBBtn outline className='mx-2 px-5'  size='lg' onClick={forgotPassword}>
        Reset
      </MDBBtn>





     
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
