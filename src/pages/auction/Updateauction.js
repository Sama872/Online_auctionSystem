import React, { useRef, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import "../../css/Addauction.css";
import { getAuthUser } from "../../helper/storage"
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Updateauction=()=>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    
    let { id } = useParams();
    

    const[auction , setAuction] = useState(
        {
          
            name:"",
            category:"",
            description:"",
            start_date:'',
            end_date:'',
            officialprice:'',
            loading:false,
            err:[],
            reload: false,
            success: null,
        }
    )
    const auth = getAuthUser();
    const image = useRef(null);




useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
   
  }
  
  const Update = (e)=>{
    e.preventDefault();
    setAuction({...auction , loading:true , err:[]})
    const formData = new FormData();
    formData.append("name", auction.name);
    formData.append("category", auction.category);
    formData.append("description", auction.description);
    if (image.current.files && image.current.files[0]) {
        formData.append("image", image.current.files[0]);
      } ;
    formData.append("start_date", auction.start_date);
    formData.append("end_date", auction.end_date);
    formData.append("officialprice", auction.officialprice);
    
    console.log(auction);
  
    axios
    .put("http://localhost:4000/auctions/"+id, formData, {
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
        image:null,
        start_date:"",
        end_date:"",
        officialprice:"",
        err: null,
        loading: false,
        success: "auction updated Successfully !",
      });
      image.current.value = null;
      fetchData(); // Call the function to update the data
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
        <form className="addauctionForm" onSubmit={Update}>
            <h2 className="textaddauction">update Auction</h2>
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
        <input className="inaddauction" type="text" id="start-date"name="startDateInput" value={auction.start_date}
        onChange={(e) => setAuction({ ...auction, start_date: e.target.value })} />
        <label >End Date</label>
        <input className="inaddauction" type="text" id="end-date" name="endDateInput" value={auction.end_date}
        onChange={(e) => setAuction({ ...auction, end_date: e.target.value })}/>
        <label >Enter a price:</label>
        <input className="inaddauction" type="number" id="priceInput" name="priceInput" value={auction.officialprice}
        onChange={(e) => setAuction({ ...auction, officialprice: e.target.value })}/>
        <input  type="file" className='addimage' name='file'ref={image}/>
        
        
        <Button  variant="primary" type="submit" style={{width:"100%"}} >update</Button>
        </form>
    </div>
    </>
)}

    
export default Updateauction;

/************************************ */


