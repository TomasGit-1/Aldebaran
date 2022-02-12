import React from 'react';
import NavbarMain from '../Components/NavbarS';
import { Table, Container, Col, Row, Form, Button, Dropdown, ButtonGroup, InputGroup ,  CloseButton , OverlayTrigger , Tooltip } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import $ from 'jquery';
import config from '../config/config.json';
import {StyleSheet } from '@react-pdf/renderer';
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
            url: "",
          
        }
     
    }
  
    render() {
       
        return (
            <main>
                <h2>
                Pagina no encontrada
                </h2>


            </main>
        )
    }
}
export default NotFound;