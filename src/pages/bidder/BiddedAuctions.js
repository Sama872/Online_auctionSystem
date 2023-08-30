import React, { useState, useEffect } from "react";
import '../../css/manageauctions.css';
import Table from 'react-bootstrap/Table';
// import { Link } from "react-router-dom";
// import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from "../../helper/storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const BiddedAuctions = ()=>{
  
    const [auctions, setAuctions] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });
    
      let {id} = useParams();
      const auth = getAuthUser();
    
      useEffect(() => {
        setAuctions({ ...auctions, loading: true });
        axios
          .get("http://localhost:4000/auctions/view_wen/"+id , {
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
    
     
    
    
      return (
        <div className="manage-auctions p-5">
          <div className="header d-flex justify-content-between mb-5">
            <h3 className="text-center ">bidded auctions </h3>
          </div>
    
          {/* <Alert variant="danger" className="p-2">
            This is simple alert
          </Alert>
          <Alert variant="success" className="p-2">
            This is simple alert
          </Alert> */}
    
    
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>auction name</th>
                <th>start date</th>
                <th>end date</th>
                <th>price</th>
                <th>officialprice</th>
                <th>winning</th>
              </tr>
            </thead>
            <tbody>
              {auctions.results.map((auction) => (
              // console.log(auction)

                <tr key={auction.id}>
                  <td>{auction.name}</td>
                  <td>{auction.start_date}</td>
                  <td>{auction.end_date}</td>
                  <td>{auction.price}</td>
                  <td>{auction.officialprice}</td>
                  {auction.price===auction.officialprice && <td>winner</td>}
                  {auction.price!==auction.officialprice && <td>lost</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
}

export default BiddedAuctions;