import React from 'react';
import {Navbar ,Container} from 'react-bootstrap';
import img from '../static/ipn.png';

// import ServicoEducativo from "./FormServicioEducativo";

const NavbarMain = ({brand}) => {
    return(
        <Navbar fixed="top" style={{background: '#6c1d45 ' ,  color: '#FFFFFF' , width: '100%' , height:"60px"}}>
            <Container>
                <Navbar.Brand style={{color: '#FFFFFF'}}>
                    {/* <img
                        src={img}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="IPN - Centro de vinculacion y desarrollo de oaxaca"
                    /> */}
                    <h6>
                        Instituto Politécnico Nacional - Centro de Vinculación y Desarrollo Regional Unidad Oaxaca             
                    </h6>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
export default NavbarMain;