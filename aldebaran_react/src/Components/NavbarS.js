import React from 'react';
import {Navbar ,Container} from 'react-bootstrap';

const NavbarMain = ({brand}) => {
    return(
        <Navbar style={{background: '#A90101' ,  color: '#FFFFFF'}}>
            <Container >
                <Navbar.Brand href="#home" style={{color: '#FFFFFF'}}>IPN - Centro de vinculacion y desarrollo de oaxaca</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text >
                    <a href="#login" style={{color: '#FFFFFF'}}>Iniciar session</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarMain;