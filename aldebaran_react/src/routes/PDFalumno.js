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
            text_2row: {
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
                marginBottom:2,
                fontSize: 15,
                textAlign: 'center',
                backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },
            bordertext:{
                borderBottom : 0.8,
                marginLeft:18,
                marginTop:1,
                marginBottom:0,

                // border: 2,
            },  
            text_0:{
                fontSize: 12,
                marginTop:1,
            },
            text_1:{
                fontSize: 10,
            },
            text_2:{
                fontSize: 8,
                marginTop:0,
                textAlign: 'center',
                width: 120
            },
            textCentered: {
                width: 100,
                fontSize: 8,
                margin:-2
            },
            bordertext_1: {
                borderBottom : 1,
                marginLeft:4,
                marginTop:1,
                marginBottom:0,
                width:190
            },
            bordertext_2: {
                borderBottom : 1,
                marginLeft:4,
                marginTop:1,
                marginBottom:0,
                width:100
            },
            bordertext_3: {
                borderBottom : 1,
                marginLeft:4,
                marginTop:1,
                marginBottom:0,
                width:336

            },
            marginLeft:{
                fontSize: 10,
                margin:10
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
                                        <Text style={styles.text_0}>Nombre completo:</Text>
                                        <div style={styles.bordertext}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>
                                    <View style={styles.container}>
                                        <Text style={ styles.text_2}>(Segun acta de nacimineto)</Text>
                                        <Text style={styles.textCentered}>Apellido Paterno</Text>
                                        <Text style={styles.textCentered}>Apellido Materno</Text>
                                        <Text style={styles.textCentered}>Nombre</Text>
                                    </View>
                                    <Text>{"\n"}</Text>



                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Domicilio:</Text>
                                        <div style={styles.bordertext}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text_2}></Text>
                                        <Text style={styles.textCentered}>Calle</Text>
                                        <Text style={styles.textCentered}>num. Int/ext</Text>
                                        <Text style={styles.textCentered}>Colonia o fracc</Text>
                                        <Text style={styles.textCentered}>C.P</Text>
                                    </View>
                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Municipio:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Lugar de nacimiento:{"\n"}</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Fecha de nacimiento:</Text>
                                        <div style={styles.bordertext_2}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Edad:{"\n"}</Text>
                                        <div style={styles.bordertext_2}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>
                                        <Text style={styles.text_0}>Genero:{"\n"}</Text>
                                        <div style={styles.bordertext_2}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>      
                                    </View>
                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>CURP:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Telefono cel:{"\n"}</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Telefono casa:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Correo Electronico:{"\n"}</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>En caso de emergencia comunicarse con:</Text>
                                        <div style={styles.bordertext_3 }>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                    </View>

                                    <Text>{"\n"}</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Telefono cel:</Text>
                                        <div style={styles.bordertext}>
                                            <Text style={styles.text_1}>{" "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    <Text>{"\n"}</Text>
                                    <Text style={styles.title}>*Formacion Academica</Text>

                                    
                                   

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