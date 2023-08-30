import React, { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard";
import '../../css/auctions.css'
import Spinner from 'react-bootstrap/Spinner';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import { getAuthUser } from "../../helper/storage";
const Auctions = ()=>{

  const [auctions , setAuctions] = useState({
        loading : true,
        results : [],
        reload : 0,
        err : null
    });

    const auth = getAuthUser();

    

    const[search , setSearch] = useState("");

    useEffect(() => {
        setAuctions({ ...auctions, loading: true });
        axios
          .get(
            "http://localhost:4000/auctions",
            {
              headers: {
                token: auth.token,
                "Content-Type": "multipart/form-data",
              },
              params: {
                search: search,
                end_date: new Date().toISOString(),
              },
            }
          )
          .then((resp) => {
                    console.log(resp);
                    setAuctions({...auctions, results:resp.data , loading:false, err:null});
                })
          .catch((err) => {
            console.error(err);
            setAuctions({
              ...auctions,
              loading: false,
              err: "Failed to fetch auctions. Please try again later.",
            });
          });
      }, [auctions.reload, auth.token]);
    
    // useEffect(()=>{
    //     setAuctions({...auctions , loading:true});
    //     axios.get("http://localhost:4000/auctions" , {
    //         headers: {
    //           token: auth.token,
    //           "Content-Type": "multipart/form-data",
    //         },
          
    //       }, {params:{search:search,end_date: new Date().toISOString(),}})
    //     .then((resp) => {
    //         console.log(resp);
    //         setAuctions({...auctions, results:resp.data , loading:false, err:null});
    //     })

    //     .catch((err) => {
    //         console.error(err);
    //         setAuctions({...auctions , loading:false , err:'Failed to fetch auctions. Please try again later.'});
    //     });
    // },[auctions.reload]);


    const searchauctions = (e) =>{
        e.preventDefault()
        setAuctions({...auctions , reload : auctions.reload +1})
    };

    return(
        

        <div className="main-content">

            {/* if loading */}
            {auctions.loading===true && (
                <div className="spinner">
                    <Spinner animation="border" />
                </div>
            )}

            {/* if not loading */}

            {auctions.loading===false && auctions.err==null && (
                <>
                    {/* filter or search */}
                    <h1>you can search about items by name or category</h1>
                    <div className="content">
                    <Form onSubmit={searchauctions}>
                        <Form.Group className="search m-5 d-flex" controlId="formBasicEmail">
                            <Form.Control
                             value={search}
                             onChange={(e)=>{
                                setSearch(e.target.value)
                             }}
                            className="search-input" 
                            type="text" 
                            placeholder="search by category or name" />
                            <button className="btn btn-primary rounded-0" >Search</button>
                        </Form.Group>
                    </Form> 
                    </div>
                
                    <div className="container">
                        {/* cards */}
                            <div className="row">
                            {auctions.results.filter((auction) => moment(auction.end_date).isSameOrAfter(moment())).map((auction) => (
                                    <div className="col-sm-6" key={auction.id}>
                                    <AuctionCard
                                        id={auction.id}
                                        name={auction.name}
                                        category={auction.category}
                                        description={auction.description}
                                        image={auction.image}
                                        price={auction.officialprice}
                                        start_date={auction.start_date}
                                        end_date={auction.end_date}
                                    />
                                    </div>
                                ))}
                            </div>
                    </div>

                                {/* alert that bided succesfuly */}
                        {/* <Alert  variant="info" className="p-3">bided successfully , if you are the winner you will recieved notification </Alert> */}

                </>
            )}

                {/* errors */}
            {auctions.loading === false && auctions.err != null && (
                <Alert  variant="danger" className="p-3">
                    {auctions.err}
                </Alert>
            )}

            {/* if not there auctions */}
             
            {auctions.loading === false && auctions.err === null && auctions.results.length===0 && (
                <Alert  variant="success" className="p-3">
                    no items 
                </Alert>
            )}
                    
        </div>
    );
};

export default Auctions;