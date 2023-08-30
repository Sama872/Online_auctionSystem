// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import axios from 'axios';
// import { setAuthUser } from "../../helper/storage";
// import { useNavigate } from "react-router-dom";
// const Register = ()=>{
//     const navigate= useNavigate();

//     const[register , setRegister] = useState(
//         {
//             user_name:"",
//             phone:"",
//             type:"",
//             email:'',
//             password:'',
//             loading:false,
//             err:[]
//         }
//     )

//     const Registerfunc = (e)=>{
//         e.preventDefault();
//         setRegister({...register , loading:true , err:[]})
//         console.log(register);
//         axios.post("http://localhost:4000/auth/register" , {
//             user_name     :register.user_name,
//             phone         :register.phone,
//             type          :register.type,
//             email         :register.email,
//             password      :register.password
//         }).then(resp =>{
//             setRegister({...register , loading:false , err:[]})
//             setAuthUser(resp.data)
//             console.log(resp.data);
//             navigate("/login")
//         }).catch(errors =>{
//             console.log(errors);
//             setRegister({...register , loading:false , err:errors.response.data.errors})
//         })
//     }


//     return(
//         <div className="register-container container" style={{margin:"50px auto" , textAlign:"center"}}> 
//             <h1>registeration form </h1>
//             {register.err.map((error , index)=>(
//                 <Alert key={index} variant="danger" className="p-3">
//                 {error.msg}
//             </Alert>
//             ))}
//             <Form onSubmit={Registerfunc}>
//                 <Form.Group className="mb-3" >
//                     <Form.Label>user name</Form.Label>
//                     <Form.Control  value={register.user_name}
//                      onChange={(e) => setRegister({...register , user_name:e.target.value})}
//                      type="text" 
//                      placeholder="Enter name"  
//                      style={{border:"3px solid black"}}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label>email</Form.Label>
//                     <Form.Control  value={register.email}
//                      onChange={(e) => setRegister({...register , email:e.target.value})} 
//                      type="text" 
//                      placeholder="Enter email"  
//                      style={{border:"3px solid black"}}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label>phone</Form.Label>
//                     <Form.Control  value={register.phone}
//                      onChange={(e) => setRegister({...register , phone:e.target.value})} 
//                      type="text" 
//                      placeholder="Enter phone"  
//                      style={{border:"3px solid black"}}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label>seller / bidder</Form.Label>
//                     <Form.Control  value={register.type}
//                      onChange={(e) => setRegister({...register , type:e.target.value})} 
//                      type="text" 
//                      placeholder="Enter type"  
//                      style={{border:"3px solid black"}}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control  value={register.password}
//                      onChange={(e) => setRegister({...register , password:e.target.value})} 
//                      type="password" 
//                      placeholder="Password"  
//                      style={{border:"3px solid black"}}/>
//                 </Form.Group>
                
//                 <Button variant="primary" type="submit" style={{width:"100%"}} disabled={register.loading===true}>
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default Register;