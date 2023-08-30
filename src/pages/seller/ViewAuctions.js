import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/storage";

const ViewAuctions = () => {


  const [auctions, setAuctions] = useState([]);

  let {id } = useParams()

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auctions/view1/"+ id);
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

  const auth = getAuthUser();

  // const deleteAuction = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:4000/auctions/" + id);
  //     const updatedAuctions = auctions.map((auctionHistory) =>
  //       auctionHistory.filter((row) => row.id !== id)
  //     );
  //     setAuctions(updatedAuctions);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <div className="manage-auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">view history</h3>
        <Link to={"/addauction"} className="btn btn-success">
          Add New Auction +
        </Link>

        <Link to={"/updateauctions/" + id} className="btn btn-success">
          manage auctions
        </Link>
      </div>

      
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>User Name</th>
          <th>auction Name</th>
         <th>Email</th>
          <th>Price</th>
           <th>Official Price</th>
           <th>Winner</th>
          
        </tr>
       </thead>
       <tbody>
         {auctions.map((auctionHistory) =>
           auctionHistory.map((row) => (
             // console.log(row)
            <tr key={row.id}>
              <td>{row.user_name}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.price}</td>
              <td>{row.officialprice}</td>
              <td>{row.winner ? row.thewinner : "N/A"}</td>
              
            </tr>
            
          ))
        )}
      </tbody>
      </Table>
   

   <br></br>
  <br></br>
  <br></br>


  
   
    </div>
  );
};

export default ViewAuctions;
