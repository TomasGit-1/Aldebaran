import React from 'react';
import { Container} from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet , PDFViewer , Font , Image } from '@react-pdf/renderer';
import {useParams} from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import logo from "../static/LogoBN.jpg";
import imgTitulo from "../static/titulo.png";
import Moment from 'moment'


// import styled from 'styled-components'
class PDFServicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Primera aplicacion React",
           
        }
    }

}

export default (props) => (
    <PDFServicio
        {...props}
        params={useParams()}
    />
);