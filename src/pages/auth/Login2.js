import { Link, useNavigate } from "react-router-dom";
import React,{ useState} from "react";
import images from '../../images/new-post.png';
import imagess from '../../images/password.png';
import "../../css/login.css";
import Button from 'react-bootstrap/Button';
import { setAuthUser } from "../../helper/storage";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const Login2 = (props)=>{
    const navigate= useNavigate();

    const[login , setLogin] = useState(
        {
            email:'',
            password:'',
            loading:false,
            err:[]
        }
    )

    const Loginfunc = (e)=>{
        e.preventDefault();
        setLogin({...login , loading:true , err:[]})
        console.log(login);
        axios.post("http://localhost:4000/auth/login" , {
            email    :login.email,
            password : login.password
        }).then(resp =>{
            setLogin({...login , loading:false , err:[]})
            setAuthUser(resp.data)
            console.log(resp.data);
            navigate("/")
        }).catch(errors =>{
            console.log(errors);
            setLogin({...login , loading:false , err:errors.response.data.errors})
        })
    }

    return(
        <div className="login" >
            
            <div className="formlogin">
            <h1>LOGIN</h1>

            {login.err.map((error , index)=>(
                <Alert key={index} variant="danger" className="p-3">
                {error.msg}
            </Alert>
            ))}
            
            <form onSubmit={Loginfunc} >
                {/* <label htmlFor="email">email</label> */}
                <img  src={images} alt="username"/>
                <input className="inputlogin" 
                id="email" type="email" 
                required placeholder="Email" 
                value={login.email}
                onChange={(e) => setLogin({...login , email:e.target.value})}/>
                <br/>
                
                {/* <label htmlFor="pass">password</label> */}
                <img src={imagess} alt="password"/>
                <input className="inputlogin" 
                id="pass" type="password"
                value={login.password}
                onChange={(e) => setLogin({...login , password:e.target.value})}
                required 
                placeholder="Password" />
                <br/>
                <div className="submit"><Button type="submit" variant="danger" disabled={login.loading===true}>Login</Button></div>
                <br/>
            </form>
            <h5>Don't have an account?</h5>
            <Link className="regi" variant="info" to={"/register"}>Create new account</Link>
            </div>
            
        </div>
        
    );
        
}

export default Login2;