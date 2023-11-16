import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/FirebaseConfig';

export default function Home() {

  const user=JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate()

  const logout= ()=>{
    signOut(auth).then((data)=>{
      localStorage.clear('user');
      navigate('/login');
      console.log(data,data)
    }).catch((error)=>{
      console.log(error);
    })
   
   
  }

  return (
 <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">"Hello Friends" </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to={"/"}>Home</Nav.Link> */}
            {user ? (
                  // <a onClick={logout} style={{textDecoration:"None",color:"black",cursor:"pointer"}}>Logout</a>
<button style={{ outline: "none", border: "none", background: "none", padding: "0", cursor: "pointer" }} onClick={logout}>
  Logout
</button>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                </>
              )}
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="container text-center" style={{marginTop:"35vh"}}>
    <h1>Welcome</h1>
    <h1>Thank you for Login</h1>
    </div>

    

 </>
  )
}
