import React from 'react';
import {  Image , Card } from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet , PDFViewer , Font } from '@react-pdf/renderer';
import {useParams} from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import imgAlum from "../static/alumno.png";

// import styled from 'styled-components'
class PDFAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curp:"",
            msg: "Primera aplicacion React",
            imagen_base64:""
        }
    }
    componentDidMount() {
        const curpid  = this.props.params;
        console.log(curpid.value);
        this.setState({ curp : curpid.value });
        this.getInfoAlmno_join(curpid.value);
    }
    getInfoAlmno_join = async (curp) => {
        
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/AlumnoJoin";
        var bodyFormData = new FormData();
        bodyFormData.append('curp', curp);
        const respuesta = await  axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            headers: { 'Content-Type': 'application/json' }
         }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error.message)
        })

        // console.log("Data");
        // console.log(respuesta);

        url = config.general[0].url + config.general[0].puerto_api + "/Api/imagen64";
        const imagen = await  axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            // headers: {'content-type': 'multipart/form-data'}
            headers: { 'Content-Type': 'application/json' }

         }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error.message)
        })
        // console.log("Imagen");
        // console.log(imagen.message);
        this.setState({ imagen_base64: imagen.message });
    }
    render() {
        let { curp } = this.state
        let { imagen_base64 } = this.state
        const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;
        const styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: '#E4E4E4'
            },
            section: {
              margin: 10,
              padding: 10,
              flexGrow: 1
            },
            body :{
                flexGrow: 1,
            },
            PDFDocument :{
                width: "100%",
                height: "100vh"
                
            },
            header: {
                textAlign: 'center', // <-- the magic
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 0,
                width: "100%",
                backgroundColor: 'yellow',
                height:20,
            },
            title: {
                margin: 20,
                fontSize: 25,
                textAlign: 'center',
                backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
              },

              headline: {
                textAlign: 'center', // <-- the magic
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 0,
                width: "100%",
                backgroundColor: 'yellow',
                height:20,
              },
              row: {
                flexGrow: 1,
                flexDirection: 'row',
              },

              wrapper: {
                flex: 1
              },
              container: {
                flex: .5,
                flexDirection: 'row',
                justifyContent: 'flex-start', //replace with flex-end or center
                borderBottomWidth: 1,
                borderBottomColor: '#000'
              },
              container2: {
                flex: .5,
                flexDirection: 'row',
                alignItems: 'flex-start',
                height: 20,
              },
              box: {
                width: 100,
                height: 100
              },
              box1: {
                backgroundColor: '#2196F3'
              },
              box2: {
                backgroundColor: '#8BC34A'
              },
              box3: {
                backgroundColor: '#e3aa1a'
              }

        });
       
        Font.register({
            family: 'Oswald',
            src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
        });
        return (
            <div>
                  {/* <PDFViewer style={styles.body}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text>Section #1</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Section #2</Text>
                            </View>
                        </Page>
                    </Document>
                  </PDFViewer> */}

                  <PDFViewer style={styles.PDFDocument} >
                    <Document>
                        <Page size="A4" style={styles.page}>
                            {/* <View style={styles.header}>
                                <Text style={styles.headline}>*Datos personales</Text>
                            </View>
                         */}
                            <View style={styles.wrapper}>
                                <View style={styles.container}>
                                    <View style={[styles.box, styles.box1]}></View>
                                    <View style={[styles.box, styles.box2]}></View>
                                    <View style={[styles.box, styles.box3]}></View>
                                </View>
                                <View style={styles.container2}>
                                    <View style={[styles.box, styles.box1]}></View>
                                    <View style={[styles.box, styles.box2]}></View>
                                    <View style={[styles.box, styles.box3]}></View>
                                </View>
                            </View>

                          
                        </Page>
                    </Document>
                  </PDFViewer>
           </div>

        )
    }
}

export default (props) => (
    <PDFAlumno
        {...props}
        params={useParams()}
    />
);

// export default PDFAlumno