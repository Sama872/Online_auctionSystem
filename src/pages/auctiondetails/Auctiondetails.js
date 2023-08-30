import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/auctiondetails.css';
import Spinner from 'react-bootstrap/Spinner';
const Auctiondetails = () => {
    let { id } = useParams();
    const [price, setPrice] = useState(30000);
    const [auction, setAuction] = useState({
      loading: true,
      result: null,
      err: null
    });
  
    useEffect(() => {
      setAuction({ ...auction, loading: true });
      axios.get("http://localhost:4000/auctions/view1/" + id)
        .then((resp) => {
          console.log(resp);
          setAuction({ ...auction, result: resp.data, loading: false, err: null });
        })
        .catch((err) => {
          console.error(err);
          setAuction({ ...auction, loading: false, err: 'Failed to fetch auctions. Please try again later.' });
        });
    }, []);
  
    const handleIncrement = () => {
      setPrice(price + 1000);
    }
  
    console.log(auction.result); // Check the value of auction.result
  
    return (
      <div className="auction-container">
        {/* if loading */}
        {auction.loading === true && (
          <div className="spinner">
            <Spinner animation="border" />
          </div>
        )}
  
        {auction.loading === false && auction.err === null && (
          <div className="container">
            <div className="row">
              <div className="col-sm-5">
                <img width={"350px"} height={"350px"} src={auction.result.image} alt="" />
              </div>
              <div className="col-sm-7">
                <h3 className="title">{auction.result.name}</h3>
                <p className="description">
                  {auction.result.description}
                </p>
                <h6 className="start-end-date">from <span>{auction.result.start_date}</span> to <span>{auction.result.end_date}</span></h6> {/* Use the correct end date */}
                <h4 className="price">{price}$ <button onClick={handleIncrement} className="btn btn-success increament-button">+1000</button></h4>
                <button className="btn btn-primary bide">bide now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Auctiondetails;