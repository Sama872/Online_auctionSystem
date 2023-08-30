import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/storage";

const Manageauctions = () => {

  
  const [auctions, setAuctions] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

//   let {id} = useParams();

  useEffect(() => {
    setAuctions({ ...auctions, loading: true });
    axios
      .get("http://localhost:4000/admin_controls" , {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      
      })
      .then((resp) => {
        setAuctions({ ...auctions, results: resp.data, loading: false, err: null });
        console.log(resp.data)
      })
      .catch((err) => {
        setAuctions({
          ...auctions,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [auctions.reload]);

  const auth = getAuthUser();
  const deleteAuction = (id) => {
    axios
      .delete("http://localhost:4000/admin_controls/" + id , {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      
      } )
      .then((resp) => {
        setAuctions({ ...auctions, reload: auctions.reload + 1 });
      })
      .catch((err) => {});
  };


  return (
    <div className="manage-auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage accounts</h3>
        <Link to={"/register"} className="btn btn-success">
          Add accounts +
        </Link>
        <br></br>
        <Link to={"/users"} className="btn btn-success">
          view users 
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>
      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}


      <h1 className="text-center">transactions</h1>
      <br></br>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>user name</th>
            <th>user type</th>
            <th>email</th>
            <th>phone number</th>
            <th>auction name</th>
            <th>category</th>
            <th>description</th>
            <th>start date</th>
            <th>end date</th>
            <th>price</th>
            <th>official price</th>
          </tr>
        </thead>
        <tbody>
          {auctions.results.map((auction) => (
          //console.log(auction)
            <tr key={auction.user_id}>
              <td>{auction.user_name}</td>
              <td> {auction.type} </td>
              <td>{auction.email}</td>
              <td>{auction.phone_number}</td>
              <td>{auction.name}</td>
              <td>{auction.category}</td>
              <td>{auction.description}</td>
              <td>{auction.start_date}</td>
              <td>{auction.end_date}</td>
              <td>{auction.price}</td>
              <td>{auction.officialprice}</td>
            </tr>
          ))}
        </tbody>
      </Table>

           
    </div>
  );
};

export default Manageauctions;