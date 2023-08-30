// import React from "react";
import { setAuthUser } from "../../helper/storage";
import { Link, useNavigate } from "react-router-dom";
import React,{useState} from "react";
import "../../css/register.css";
import Button from 'react-bootstrap/Button';
import images from '../../images/new-post.png';
import imagess from '../../images/password.png';
import imageee from '../../images/name.png';
import userImage from '../../images/typesof_users.png'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Register2 = (props)=>{
    const navigate= useNavigate();

    const[register , setRegister] = useState(
        {
            user_name:"",
            phone:"",
            type:"",
            email:'',
            password:'',
            loading:false,
            err:[]
        }
    )

    const Registerfunc = (e)=>{
        e.preventDefault();
        setRegister({...register , loading:true , err:[]})
        console.log(register);
        axios.post("http://localhost:4000/auth/register" , {
            user_name     :register.user_name,
            phone         :register.phone,
            type          :register.type,
            email         :register.email,
            password      :register.password
        }).then(resp =>{
            setRegister({...register , loading:false , err:[]})
            // setAuthUser(resp.data)
            console.log(resp.data);
            navigate("/login")
        }).catch(errors =>{
            console.log(errors);
            setRegister({...register , loading:false , err:errors.response.data.errors})
        })
    }


    return(
        <>
        {register.err.map((error , index)=>(
            <Alert key={index} variant="danger" className="p-3">
            {error.msg}
        </Alert>
        ))}
        <div className="register">
            <div className="formregister">
            <h1>Sign Up</h1>
           


            <form onSubmit={Registerfunc}>
            
                <img  src={imageee} alt="password"/>
                <input className="inputregister" id="fname" type="text" required placeholder="First Name" value={register.user_name}
                     onChange={(e) => setRegister({...register , user_name:e.target.value})}/>
                <br/>
                <img  src={imageee} alt="password"/>
                <input className="inputregister"  id="phone" type="text" required placeholder="Phone" value={register.phone}
                     onChange={(e) => setRegister({...register , phone:e.target.value})}/>
                <br/>
                <img  src={images} alt="username"/>
                <input className="inputregister"  id="email" type="email" required placeholder="Email" value={register.email}
                     onChange={(e) => setRegister({...register , email:e.target.value})}/>
                <br/>
                <img  src={imagess} alt="password"/>
                <input className="inputregister"  id="pass" type="password"  required placeholder="Password"value={register.password}
                     onChange={(e) => setRegister({...register , password:e.target.value})}/>
                <br/>
                <img  src={userImage} alt="users"/>
                <select className="inputregister" value={register.type} onChange={(e) => setRegister({...register , type:e.target.value})} id="Type" form="carform">
                    <option></option>
                    <option>seller</option>
                    <option>bidder</option>
                </select>
                <br/>
                <div className="submitregister"><Button variant="danger" className="buttonregister" type="submit" /*onClick={() => props.onFormSwitch('login')}*/ disabled={register.loading===true}>Sign up</Button></div>
            </form>
            <h5>Alredy have an account?</h5>
            <Link variant="info" to={"/login"}>Login</Link>
            </div>
        </div>
        
        </>
    );
}

export default Register2;


// import React, { useState } from "react";
// import { setAuthUser } from "../../helper/storage";
// // import { useNavigate } from "react-router-dom";
// import "../../css/register.css";
// import Button from "react-bootstrap/Button";
// import images from "../../images/new-post.png";
// import imagess from "../../images/password.png";
// import imageee from "../../images/name.png";
// import userImage from "../../images/typesof_users.png";
// import Alert from "react-bootstrap/Alert";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Register2 = (props) => {
// //   const navigate = useNavigate();

//     const history = useHistory();
//   const [register, setRegister] = useState({
//     user_name: "",
//     phone: "",
//     type: "",
//     email: "",
//     password: "",
//     loading: false,
//     err: [],
//   });

//   const Registerfunc = (e) => {
//     e.preventDefault();
//     setRegister({...register , loading:true , err:[]})
//     console.log(register);
//     axios.post("http://localhost:4000/auth/register" , {
//         user_name     :register.user_name,
//         phone         :register.phone,
//         type          :register.type,
//         email         :register.email,
//         password      :register.password
//     }).then(resp =>{
//         setRegister({...register , loading:false , err:[]})
//         setAuthUser(resp.data)
//         console.log(resp.data);

//         // Redirect the user to the login page and prefill the email and password fields
        
//         history.push({
//             pathname: "/login",
//             state: { email: register.email, password: register.password }
//         });

//     }).catch(errors =>{
//         console.log(errors);
//         setRegister({...register , loading:false , err:errors.response.data.errors})
//     })

//   };

//   return (
//     <>
//       {register.err.map((error, index) => (
//         <Alert key={index} variant="danger" className="p-3">
//           {error.msg}
//         </Alert>
//       ))}
//       <div className="register">
//         <div className="formregister">
//           <h1>Sign Up</h1>

//           <form onSubmit={Registerfunc}>
//             <img htmlfor="pass" src={imageee} alt="password" />
//             <input
//               className="inputregister"
//               id="fname"
//               type="text"
//               required
//               placeholder="First Name"
//               value={register.user_name}
//               onChange={(e) => setRegister({ ...register, user_name: e.target.value })}
//             />
//             <br />
//             <img htmlfor="phone" src={imageee} alt="password" />
//             <input
//               className="inputregister"
//               id="phone"
//               type="text"
//               required
//               placeholder="Phone"
//               value={register.phone}
//               onChange={(e) => setRegister({ ...register, phone: e.target.value })}
//             />
//             <br />
//             <img htmlfor="email" src={images} alt="username" />
//             <input
//               className="inputregister"
//               id="email"
//               type="email"
//               required
//               placeholder="Email"
//               value={register.email}
//               onChange={(e) => setRegister({ ...register, email: e.target.value })}
//             />
//             <br />
//             <img htmlfor="pass" src={imagess} alt="password" />
//             <input
//               className="inputregister"
//               id="pass"
//               type="password"
//               required
//               placeholder="Password"
//               value={register.password}
//               onChange={(e) => setRegister({ ...register, password: e.target.value })}
//             />
//             <br />
//             <img htmlfor="Type" src={userImage} alt="users" />
//             <select
//               className="inputregister"
//               value={register.type}
//               onChange={(e) => setRegister({ ...register, type: e.target.value })}
//               id="Type"
//               form="carform"
//             >
//               <option>seller</option>
//               <option>bidder</option>
//             </select>
//             <br />
//             <div className="submitregister">
//               <Button variant="danger" className="buttonregister" type="submit" disabled={register.loading === true}>
//                 Sign up
//               </Button>
//             </div>
//           </form>
//           <h5>Already have an account?</h5>
//           <Button variant="info" onClick={() => props.onFormSwitch("login")}>
//             Login
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register2;