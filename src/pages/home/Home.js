import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import image1 from "../../images/istockphoto-1218534037-612x612.jpg";
import image2 from "../../images/imagesus.png";
import image3 from "../../images/Untitledabout.jpg";
import "../../css/Home.css"



const Home = ()=>{
    return(
        <div>
            <img src={image1} alt="hh" className="Homephoto"/>
    <CardGroup className="card-group container">
        <div className="row">
        <div className="col-sm-6">
            <Card className="card">
                <Card.Img variant="top" src={image2} className="card-image"/>
                <Card.Body>
                <Card.Title className="card-title">contact us</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    
        <div className="col-sm-6">
             <Card className="card ">
                <Card.Img variant="top" src={image3} className="card-image"/>
                <Card.Body>
                <Card.Title className="card-title">about us</Card.Title>
                <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{' '}
                </Card.Text>
                </Card.Body>
        
            </Card>
        </div>
        </div>
    
    </CardGroup>

        </div> 
    );
}

export default Home;