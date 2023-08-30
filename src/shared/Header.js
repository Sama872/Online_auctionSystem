import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";
import image from '../images/unnamed.png';
import "../css/Header.css"

const Header = ()=>{

    const navigate= useNavigate();
    const auth = getAuthUser()
    console.log(auth);
    const Logout = () =>{
        removeAuthUser()
        navigate("/login")
    }

    return(
        <div>
            <Navbar style={{marginBottom:"30px" , padding:"20px 0"}} bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="../pages/home"><img  className="logo" src={image} alt="gg" /></Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to={"/"}>home</Link>
                   
                    {auth && auth.type==='admin' && (
                        <>
                            <Link className="nav-link" to={"/manage-auctions"}>manage accounts</Link>
                        </>
                    )}
                    

                    
                    {/* unauthenticated routes */}
                    {!auth &&  (
                    <Link className="nav-link" to={"/login"}>log in</Link>
                    )}

                    {/* admin links */}
                    {/* {auth && auth.type==='admin' && (
                        
                    )} */}

                    {/* seller links */}
                    {auth && auth.type ==='seller' && auth.status===1 && (
                        <>
                         <Link className="nav-link" to={`/viewauctions/${auth.user_id}`}>my auctions</Link>
                         <Link className="nav-link" to={"/addauction"}>add auction</Link>
                         </>
                    )}

                    {/* bidder links */}
                    {auth && auth.type ==='bidder'  && auth.status===1 && (
                        <>
                         <Link className="nav-link" to={`/biddedauctions/${auth.user_id}`}>bidded auctions</Link>
                         <Link className="nav-link" to={"/auctions"}>auctions</Link>
                        </>
                    )}

                    
                </Nav>
                    {/* authenticated routes */}
                <Nav className="ms-auto">
                   {auth && <button onClick={Logout} className="btn btn-primary">log out</button>} 
                </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;