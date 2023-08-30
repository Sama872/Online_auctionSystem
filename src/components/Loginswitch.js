import Login2 from "../pages/auth/Login2";
import Register2 from "../pages/auth/Register2";
import React,{useState} from "react";
function Loginswitch(){
    const [currentForm,setcurrentForm]=useState('login');
    const toggleForm=(formName)=>{
        setcurrentForm(formName);

    }
    return(
        <div>
            {
             currentForm === "login" ?<Login2 onFormSwitch={toggleForm}/> :<Register2 onFormSwitch={toggleForm}/>
            }
        </div>

    );
}
export default Loginswitch;