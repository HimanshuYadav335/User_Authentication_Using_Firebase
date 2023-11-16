import { Navigate } from "react-router-dom";

const ProtectedRoute=({ children })=>{

    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
        return children;
    }
    else{
        return <Navigate to={'/login'}/>
    }
}
export default ProtectedRoute
// import { useNavigate } from "react-router-dom";

// export default function ProtectedRoute(props){
//        const {Component}=props;
//        const navigate=useNavigate();
//        const user=JSON.parse(localStorage.getItem('user'));
//        if(!user){
//          navigate('/login')
//        }
//        else{
//         <div>
//             <Component/>
//         </div>
//        }
// }


// import { Navigate } from "react-router-dom";

// const ProtectedRoute=(children)=>{

//     const user=JSON.parse(localStorage.getItem('user'))
//     if(user){
//         return children;
//     }
//     else{
//         return <Navigate to={'/login'}/>
//     }
// }
// export default ProtectedRoute react-dom.development.js:14887 Uncaught Error: Objects are not valid as a React child (found: object with keys {children}). If you meant to render a collection of children, use an array instead.
//     at throwOnInvalidObjectType (react-dom.development.js:14887:1)
//     at reconcileChildFibers (react-dom.development.js:15828:1)
//     at reconcileChildren (react-dom.development.js:19167:1)
//     at mountIndeterminateComponent (react-dom.development.js:20157:1)
//     at beginWork (react-dom.development.js:21587:1)
//     at beginWork$1 (react-dom.development.js:27426:1)
//     at performUnitOfWork (react-dom.development.js:26557:1)
//     at workLoopSync (react-dom.development.js:26466:1)
//     at renderRootSync (react-dom.development.js:26434:1)
//     at recoverFromConcurrentError (react-dom.development.js:25850:1)