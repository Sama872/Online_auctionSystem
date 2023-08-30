import React, {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/auctioncard.css';
// import axios from "axios";
import { getAuthUser } from "../helper/storage";


const AuctionCard = (props) => {

  const auth = getAuthUser()

  const [price, setPrice] = useState(props.price);

  console.log(auth);

  const handleIncrement = () => {
    setPrice(price + 1000);
  };

  const handleBidButtonClick = () => {
    // axios
    //   .put(`http://localhost:4000/auctions/bid/${props.id}`, { officialprice: price + 1000 })
    //   .then((response) => {
    //     console.log(response.data);
    //     setPrice(response.data);
    //     alert("Your bid has been submitted successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Update a bid in the auction
      fetch(`http://localhost:4000/auctions/bid/${props.id}` , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': auth.token // replace with the actual token value
        },
        body: JSON.stringify({
          officialprice: price // replace with the new price value
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // logs the updated auction price
      })
      .catch(error => {
        console.error(error);
      });

      fetch(`http://localhost:4000/auctions/bid/${props.id}` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': auth.token // replace with the actual token value
        },
        body: JSON.stringify({
          officialprice: price // replace with the new price value
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // logs the updated auction price
        alert("bidded succesfully");
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  return (
    <>
      <div className="card">
        <Card className="body-card ">
          <Card.Img className="card-img" variant="top" src={props.image}></Card.Img>
          <Card.Body>
            <Card.Title className="title">{props.name}</Card.Title>
            <Card.Text className="description">{props.description}</Card.Text>
            {/* category */}
            <p className="category">category : {props.category}</p>
            {/* start date - end date */}
            <p className="date">
              from {props.start_date} to {props.end_date}
            </p>
            {/* price */}
            <p className="price">
              price : {price}{" "}
              {/* seller links */}
              {auth && auth.type ==='bidder'  && auth.status==1 &&  (
                         <>
                            <button onClick={handleIncrement} className="btn btn-info">
                                +1000
                            </button>
                         </>
                    )}
            </p>
                {auth && auth.type==='bidder' && auth.status==1 && (
                  <Button
                  style={{ width: "100%" }}
                  variant="primary"
                  onClick={handleBidButtonClick}
                >
                    bide
                </Button>
                )}
            
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AuctionCard;
