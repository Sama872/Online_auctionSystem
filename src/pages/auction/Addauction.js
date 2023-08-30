import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import "../../css/Addauction.css";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
// import { setAuthUser } from "../../helper/storage";
// import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/storage";


const Addauction=()=>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    
    

    const[auction , setAuction] = useState(
        {
            name:"",
            category:"",
            description:"",
            image:'',
            start_date:'',
            end_date:'',
            officialprice:'',
            loading:false,
            err:[],
            success: null,
        }
    )

    const auth = getAuthUser();
    const image = useRef(null);

    const createAuction = (e)=>{
        e.preventDefault();
        setAuction({...auction , loading:true , err:[]})
        const formData = new FormData();
        formData.append("name", auction.name);
        formData.append("category", auction.category);
        formData.append("description", auction.description);
        if (image.current.files && image.current.files[0]) {
            formData.append("image", image.current.files[0]);
          }  
        formData.append("start_date", auction.start_date);
        formData.append("end_date", auction.end_date);
        formData.append("officialprice", auction.officialprice);
        
        console.log(auction);
        // axios.post("http://localhost:4000/auctions/create" , {
        //     name                 :auction.name,
        //     category             :auction.category,
        //     description          :auction.description,
        //     image                :auction.image,
        //     start_date           :auction.start_date,
        //     end_date             :auction.end_date,
        //     officialprice        :auction.officialprice
        // }).then((response) => response.blob()).then(resp =>{
        //     setRegister({...register , loading:false , err:[]})
        //     setAuthUser(resp.data)
        //     console.log(resp.data);
        //     navigate("/login")
        // }).catch(errors =>{
        //     console.log(errors);
        //     setRegister({...register , loading:false , err:errors.response.data.errors})
        // })

        axios
      .post("http://localhost:4000/auctions/create", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(auction.err)
        setAuction({
          name: "",
          description: "",
          category:"",
          start_date:"",
          end_date:"",
          officialprice:"",
          err: null,
          loading: false,
          success: "auction Created Successfully !",
        });
        image.current.value = null;
      })
      .catch((err) => {
        setAuction({
          ...auction,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };


  return(
    <>
     {auction.err && (
    <Alert variant="danger" className="p-2">
      {auction.err}
    </Alert>
  )}


  {auction.success && (
    <Alert variant="success" className="p-2">
      {auction.success}
    </Alert>
  )}
    <div className="addauction">
        <form className="addauctionForm" onSubmit={createAuction}>
            <h2 className="textaddauction">Add Auction</h2>
        <label >Name</label>
        <input className="inaddauction" type="text" id="Name" value={auction.name}
        onChange={(e) => setAuction({ ...auction, name: e.target.value })} />
        <label >Category</label>
        {/* <input className="inaddauction" type="select" id="Category" value={CategoryInput} onChange={handleCategoryInputChange} /> */}
        <select className="inaddauction" value={auction.category}
        onChange={(e) => setAuction({ ...auction, category: e.target.value })}
                  id="Category" form="carform">
            <option ></option> 
            <option >Cars</option>
            <option >Rooms</option>
            <option >antiques</option>
        </select>
        <label >Description</label>
        <input className="inaddauction" type="text" id="Description" value={auction.description}
        onChange={(e) => setAuction({ ...auction, description: e.target.value })}/>
        <label >Start Date</label>
        <input className="inaddauction" type="text" id="start-date" placeholder="2023-04-26 12:30:15" name="startDateInput" value={auction.start_date}
        onChange={(e) => setAuction({ ...auction, start_date: e.target.value })} />
        <label >End Date</label>
        <input className="inaddauction" type="text"  placeholder="2024-04-26 12:30:15" id="end-date" name="endDateInput" value={auction.end_date}
        onChange={(e) => setAuction({ ...auction, end_date: e.target.value })}/>
        <label>Enter a price:</label>
        <input className="inaddauction" type="number" id="priceInput" name="priceInput" value={auction.officialprice}
        onChange={(e) => setAuction({ ...auction, officialprice: e.target.value })}/>
        <input  type="file" className='addimage' name='file'ref={image}/>
        
        
        <Button  variant="primary" type="submit" style={{width:"100%"}} >Upload</Button>
        </form>
    </div>
    </>
)}


    
   
    
    export default Addauction;