import React from 'react';
import { Navbar, Container, Col, Row, Image } from 'react-bootstrap';
import img from '../static/logo2transparente.png';
import logo from "../static/LogoBN.jpg";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import ServicoEducativo from "./FormServicioEducativo";

const NavbarMain = ({ brand }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        image: {
            height: 40,
            width: 34,
            opacity: 0.8,
            // backgroundColor: 'transparent',      
        }
    });

    return (
        <div className="container-fluid text-center text-md-left" style={{ background: '#6c1d45 ', color: '#FFFFFF', width: '100%', height: "40px", position: "fixed", bottom: 0 }} >
            <Image
                style={styles.image}
                src={img}
            />
            {/* <h6>
                https://www.ipn.mx/         
                    </h6> */}
        </div>
        // <Navbar style={{ background: '#6c1d45 ', color: '#FFFFFF', width: '100%', height: "45px", position: "fixed", bottom: 0 }} >
        //     <Navbar.Brand alignContent="flex-center" >
        //         <Image
        //             style={{ background: '#6c1d45 ' }}
        //             src={logo}
        //             className="mx-auto"
        //             width="40"
        //             height="40"
        //         />

        //         {/* <img
        //                 src={logo}
        //                 className="mx-auto d-block"
        //                 width="40"
        //                 height="40"
        //                 alt="IPN - Centro de vinculacion y desarrollo de oaxaca"
        //             />
        //              */}
        //     </Navbar.Brand>
        // </Navbar>
    );
}
export default NavbarMain;