import React, {  useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import "../../css/Addauction.css";
import { getAuthUser } from "../../helper/storage"
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Updateuser=()=>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    
    let { id } = useParams();
    
    let data = localStorage.getItem("user") ;

    data = JSON.parse(data) ;
    console.log(data) ;

    const[user , setUser] = useState(
        {
          
            user_name:data.user_name,
            email:data.email,
            password:data.password,
            status:data.status,
            type:data.type,
            phone_number:data.phone_number,
            status:data.status,
            loading:false,
            err:[],
            reload: false,
            success: null,
        }
    )

    const auth = getAuthUser();



useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
   
  }
  
  const Update = (e)=>{
    e.preventDefault();
    setUser({...user , loading:true , err:[]})
    const formData = new FormData();
    formData.append("user_name", user.user_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("status", user.status);
    formData.append("type", user.type);
    formData.append("phone_number", user.phone_number);
    
    console.log(user);
    console.log(formData)
  
    axios
    .put(`http://localhost:4000/admin_controls/${id}`,/* formData ,*/  /*{
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      },*/
       {
        user_name :user.user_name,
        email :user.email,
        password  :user.password,
        phone_number :user.phone_number,
        status :user.status,
        type :user.type,
      }
      )
    .then((resp) => {
      console.log(resp)
      setUser({
        user_name:"",
        email:"",
        password:"",
        status:'',
        type:'',
        phone_number:'',
        err: null,
        loading: false,
        success: "user info updated Successfully !",
      });
      
      fetchData(); // Call the function to update the data
    })
    .catch((err) => {
      setUser({
        ...user,
        loading: false,
        success: null,
        err: "Something went wrong, please try again later !",
      });
    });
  };


//*********************************** */


  

  return(
    <>
     {user.err && (
    <Alert variant="danger" className="p-2">
      {user.err}
    </Alert>
  )}


  {user.success && (
    <Alert variant="success" className="p-2">
      {user.success}
    </Alert>
  )}
    <div className="addauction"> 
        <form className="addauctionForm" onSubmit={Update}>
            <h2 className="textaddauction">update user</h2>

        <label >user Name</label>
        <input className="inaddauction" type="text" id="Name" value={user.user_name}
        onChange={(e) => setUser({ ...user, user_name: e.target.value })} />


        <label >email</label>
        <input className="inaddauction" type="text" id="Description" value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}/>


        <label >password</label>
        <input className="inaddauction" type="password" id="start-date" name="startDateInput" value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })} />

        <label >status</label>
        <input className="inaddauction" type="text" id="end-date" name="endDateInput" value={user.status}
        onChange={(e) => setUser({ ...user, status: e.target.value })}/>

        <label >type</label>
        {/* <input className="inaddauction" type="select" id="Category" value={CategoryInput} onChange={handleCategoryInputChange} /> */}
        <select className="inaddauction" value={user.type}
        onChange={(e) => setUser({ ...user, type: e.target.value })}
                  id="Category" form="carform">
            <option ></option>
            <option >seller</option>
            <option >bidder</option>
        </select>
       
       
        
        <label >phone number</label>
        <input className="inaddauction" type="number" id="priceInput" name="priceInput" value={user.phone_number}
        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}/>
        
        
        
        <Button  variant="primary" type="submit" style={{width:"100%"}} >update</Button>
        </form>
    </div>
    </>
)}

    
export default Updateuser;

/************************************ */


