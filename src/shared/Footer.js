import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ()=>{
    return(
        <div style={{position:"relative" , bottom:"0" , width:"100%" , padding:"70px "}} className="bg-dark text-light">
                <Container>
                    <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>Some information about your company or organization.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Some contact information for your company or organization.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>Links to your social media pages.</p>
                    </Col>
                    </Row>
                </Container>
            
        </div>
    );
}

export default Footer;