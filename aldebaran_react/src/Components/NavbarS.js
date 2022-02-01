import React from 'react';
import {Navbar ,Container} from 'react-bootstrap';
import img from '../static/ipn.png';

// import ServicoEducativo from "./FormServicioEducativo";

const NavbarMain = ({brand}) => {
    return(
        <Navbar fixed="top" style={{background: '#600101' ,  color: '#FFFFFF' , width: '100%'}}>
            <Container>
                <Navbar.Brand style={{color: '#FFFFFF'}}>
                    <img
                        src={img}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="IPN - Centro de vinculacion y desarrollo de oaxaca"
                    />
                    IPN - Centro de vinculacion y desarrollo de oaxaca                
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
export default NavbarMain;