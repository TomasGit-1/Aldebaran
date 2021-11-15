import React from 'react';
import {Navbar ,Container} from 'react-bootstrap';

const NavbarMain = ({brand}) => {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">IPN - Centro de vinculacion y desarrollo de oaxaca</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="#login">Iniciar session</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarMain;