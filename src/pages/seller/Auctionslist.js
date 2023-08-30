import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/storage";

const Auctionslist = () => {


  const [auctions, setAuctions] = useState([]);

  let {id } = useParams()


  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auctions/updateauctions/"+id);
        setAuctions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuctions();
  }, [id]);



  
  // const deleteAuction = (id) => {
  //   axios
  //     .delete("http://localhost:4000/auctions/" + id)
  //     .then((resp) => {
  //       setAuctions({ ...auctions, reload: auctions.reload + 1 });
  //     })
  //     .catch((err) => {});
  // };

  const deleteAuction = async (id) => {
    try {
      await axios.delete("http://localhost:4000/auctions/" + id);
      const updatedAuctions = auctions.map((auctionHistory) =>
        auctionHistory.filter((row) => row.id !== id)
      );
      setAuctions(updatedAuctions);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="manage-auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">view history</h3>
        <Link to={"/addauction"} className="btn btn-success">
          Add New Auction +
        </Link>
      </div>

     
   

   <br></br>
  <br></br>
  <br></br>


  <Table striped bordered hover>
      <thead>
        <tr>
          <th>auction Name</th>
          <th>category</th>
          <th>description</th>
           <th>Price</th>
           <th>start_date</th>
           <th>end_date</th>
           <th></th>
        </tr>
       </thead>
       <tbody>
         {auctions.map((auctionHistory) =>
           auctionHistory.map((row) => (
            //  console.log(row)
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>{row.description}</td>
              <td>{row.price}</td>
              <td>{row.start_date}</td>
              <td>{row.end_date}</td>
              <td>
              <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteAuction(row.id);
                  }}>
                  Delete
                </button>
                <br></br>
                <br></br>
                <br></br>
                <Link
                  to={"/updateauction/" + row.id} 
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
               
              </td>
            </tr>
            
          ))
        )}
      </tbody>
      </Table>
  
   
    </div>
  );
};

export default Auctionslist;
