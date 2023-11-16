import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ResetPassword from './ResetPassword';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
function App() {
  return ( 
    <>
    
    <Router>
      <Routes>
      <Route path='/' element={<ProtectedRoute>
        <Home/>
      </ProtectedRoute>}/>

       
        <Route path='/login' element={<Login/>}/>

       {/* <Route path='/login' element={<Login/>} /> */}
       <Route path='/signup' element={<Signup/>} />
       <Route path='/resetpassword' element={<ResetPassword/>} />
      </Routes>
    </Router>

  
    </>
  );
}

export default App;