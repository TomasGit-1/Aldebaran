import React from 'react';
import {  Image , Card , Row , Col , Container} from 'react-bootstrap'
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
            imagen_base64:"",
            informacion:[]
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

        console.log("Data");
        console.log(respuesta);

        let arrayInfo = []

        arrayInfo.push(respuesta.nombre);
        arrayInfo.push(respuesta.appmat);
        arrayInfo.push(respuesta.apppat);

        console.log(arrayInfo);
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
        this.setState({ informacion:  arrayInfo});
    }
    render() {
        let { curp } = this.state
        let { imagen_base64 } = this.state
        const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;
        let { informacion } = this.state

        const styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: 'white'
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
            row: {
                flexGrow: 1,
                flexDirection: 'row',
            },
            container: {
                flex: 200,
                flexDirection: 'row',
                alignItems: 'flex-start', //replace with flex-end or center,
                // marginBottom:20  
            },
            title: {
                margin: 0,
                fontSize: 15,
                textAlign: 'center',
                backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },
            text_1:{
                fontSize: 11,
                marginTop:0,
            },
            bordertext:{
                borderBottom : 2,
                marginLeft:18,
                marginTop:2
                // border: 2,
            },  
            text_0:{
                fontSize: 14,
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
                                
                                <View style={styles.wrapper}>
                                    <Text style={styles.title}>Imagenes</Text>

                                    <Text style={styles.title}>*Datos personales</Text>
                            
                                    <View style={styles.container}>
                                        <Text style={styles.row ,styles.text_0}>Nombre completo:{" "} </Text>
                                        <div style={styles.row, styles.bordertext}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.row ,styles.text_0}>Nombre completo:{" "} </Text>
                                        <div style={styles.row, styles.bordertext}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.row}>Section #4</Text>
                                        <Text style={styles.row}>Section #4</Text>
                                        <Text style={styles.row}>Section #5</Text>
                                        <Text style={styles.row}>Section #5</Text>
                                    </View>
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