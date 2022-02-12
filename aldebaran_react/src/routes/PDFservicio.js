import React from 'react';
import { Container } from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import logo from "../static/LogoBN.jpg";
import imgTitulo from "../static/titulo.png";
import Moment from 'moment'

class PDFServicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Primera aplicacion React",

        }
    }
    componentDidMount() {
        var  parametros  = this.props.params;
       console.log(parametros);
    }
    render() {
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            },
            body: {
                flexGrow: 1,
            },
            PDFDocument: {
                width: "100%",
                height: "100vh"
            },
            text_2row: {
                flexGrow: 1,
                flexDirection: 'row',
            },
            mainContainer: {
                height: "100%", marginTop: 5
            },
            container: {
                flexDirection: 'row',
                alignItems: 'flex-start', //replace with flex-end or center,
                // backgroundColor: 'blue',
                marginBottom: 5
                // marginBottom:20  
            },
            title: {
                margin: 0,
                marginBottom: 2,
                fontSize: 14,
                textAlign: 'center',
                // backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },
            text1: {
                fontSize: 10,
                textAlign: 'center',
                alignItems: 'center',
            },
            text2: {
                fontSize: 10,
                color: "#303f9f"
            },
            text3: {
                fontSize: 8,
                textAlign: 'center',
                fontFamily: 'Oswald',
                alignItems: 'center',
                textDecoration: 'underline',
            },
            text4: {
                width: 120, marginRight: 20,
                fontSize: 8, textAlign: 'center'
            }

        });
        Font.register({
            family: 'Oswald',
            src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
        });
        return (
            <div>
                <PDFViewer style={styles.PDFDocument}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                            <Text style={styles.title}>Servicio</Text>

                            </View >
                        </Page>
                    </Document>
                </PDFViewer>

            </div>

        )
    }

}



export default (props) => (
    <PDFServicio
        {...props}
        params={useParams()}
    />
    );