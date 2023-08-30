// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import axios from 'axios';
// import { setAuthUser } from "../../helper/storage";
// import { useNavigate } from "react-router-dom";
// // import images from '../../images/new-post.png';
// // import imagess from '../../images/password.png';
// import "../../css/login.css";
// const Login = ()=>{
//    const navigate= useNavigate();

//     const[login , setLogin] = useState(
//         {
//             email:'',
//             password:'',
//             loading:false,
//             err:[]
//         }
//     )

//     const Loginfunc = (e)=>{
//         e.preventDefault();
//         setLogin({...login , loading:true , err:[]})
//         console.log(login);
//         axios.post("http://localhost:4000/auth/login" , {
//             email    :login.email,
//             password : login.password
//         }).then(resp =>{
//             setLogin({...login , loading:false , err:[]})
//             setAuthUser(resp.data)
//             console.log(resp.data);
//             navigate("/auctions")
//         }).catch(errors =>{
//             console.log(errors);
//             setLogin({...login , loading:false , err:errors.response.data.errors})
//         })
//     }

//     return(
//         <div className="login-container container" style={{margin:"50px auto" , textAlign:"center"}}>
//             <h1>login form </h1>
//             {login.err.map((error , index)=>(
//                 <Alert key={index} variant="danger" className="p-3">
//                 {error.msg}
//             </Alert>
//             ))}
//              <Form onSubmit={Loginfunc}>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" required
//                      placeholder="Enter email"
//                      style={{border:"3px solid black"}}
//                      value={login.email}
//                      onChange={(e) => setLogin({...login , email:e.target.value})}
//                      />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                      type="password" required
//                      placeholder="Password"
//                      style={{border:"3px solid black"}}
//                      value={login.password}
//                      onChange={(e) => setLogin({...login , password:e.target.value})}
//                      />
//                 </Form.Group>
                
//                 <Button variant="primary" type="submit" style={{width:"100%"}} disabled={login.loading===true}>
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default Login;