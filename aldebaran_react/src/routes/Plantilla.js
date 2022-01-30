import React from 'react';
import {   Card , Row , Col , Container} from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet , PDFViewer , Font , Image } from '@react-pdf/renderer';
import {useParams} from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import logo from "../static/LogoBN.jpg";
import imgTitulo from "../static/titulo.png";
import imgFotografia from "../static/titulo.png";

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
                fontSize: 14,
                textAlign: 'center',
                // backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },
            title_2: {
                margin: -10,
                marginBottom:2,
                fontSize: 10,
                textAlign: 'center',
                // backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },
            title_3: {
                textDecoration: 'underline',
                margin: -5,
                fontSize: 12,
                textAlign: 'center',
                // backgroundColor: 'red',
                textTransform: 'uppercase',
                fontFamily: 'Oswald',
                alignItems: 'center',
            },

            bordertext:{
                borderBottom : 1,
                marginLeft:18,
                marginTop:1,
                marginBottom:0,

                // border: 2,
            },  
            text_0:{
                fontSize: 12,
            },
            text_1:{
                fontSize: 10,
            },
            
            text_2:{
                fontSize:8,textAlign: 'center',width: 120 ,  marginRight:20 ,  backgroundColor: 'blue'
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
            bordertext_genero: {
                marginLeft:1,
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
            },
            images_color:{
                width:70,
                height:70
            },
            container_Header:{
                width:"100%",
                backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'flex-start', //replace with flex-end or center,
            },
            left_Header:{
                float:"left",
                width:40,
                alignItems: 'flex-center', //replace with flex-end or center,
            },
            right_Header:{
                textAlign:"left",
                width:40,
            },
            bordertext_4:{
                borderBottom : 1,
                marginLeft:70,
                marginTop:1,
                marginBottom:0,
                width:"100%"
            },
            bordertext_5:{
                borderBottom : 1,
                marginLeft:2,
                marginTop:1,
                marginBottom:0,
                width:30
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
                                <View style={{flexDirection: 'row'}}>
                                    <Image 
                                        style={{alignSelf: 'flex-start' , width:60 , height:70}}
                                        src={logo}
                                    />
                                    <Image 
                                        style={{marginLeft: 'auto' , width:"80%" , height:60 , marginLeft:10 , marginRight:5}}
                                        src={imgTitulo}
                                    />
                                    <View style={{flexDirection: 'row'  , border:0.9 , width:180}}>
                                        <View style={{alignItems: 'flex-start'  ,  color: 'black' ,fontSize: 10  , padding:4 }} >
                                            <Text>Nivel:</Text>
                                            <Text style={{ borderBottom : 0.8, width:"140%" }}> </Text>
                                            
                                            <Text>Módulo:</Text>
                                            <Text style={{ borderBottom : 0.8, width:"140%"}}> </Text>

                                        </View>
                                        <Image 
                                            style={{marginLeft: 'auto' , width:70 , height:58}}
                                            source={{uri: imagen_base64}}
                                        />
                                    </View>

                                </View>
                             

                                 {/* <Image
                                    style={styles.images_color} 
                                    src={{imgAlum}}
                                /> */}
                                {/* 
                                <Text>{"********"}</Text>

                                <Image src={{uri:"https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg" , method: 'POST', headers:{'Access-Control-Allow-Origin': '*'}}}/>
                                <Text>{"********"}</Text>
                                
                                 */}
                                
                                <Text>{"\n"}</Text>

                                <Text style={styles.title_2}>Solicitud de inscripción</Text>
                                <Text style={styles.title_3}>{informacion[0]}</Text>

                                <View style={{backgroundColor: 'red',height: "100vh" , marginTop:10}}>

                                    <Text style={styles.title}>*Datos personales</Text>
                                    <View style = {{ flex: 200,flexDirection: 'row',alignItems: 'flex-start'}}>
                                        <Text style={styles.text_0}>Nombre completo:</Text>
                                        <div style={{borderBottom : 1,marginLeft:20,marginTop:1,marginBottom:0,width:"100%"}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   

                                    </View>
                                    <View style = {{ flex: 60,flexDirection: 'row',alignItems: 'flex-start' , fontSize:8, textAlign: 'center',}}>
                                        <Text style ={{width: 120 ,  marginRight:20}}>(Segun acta de nacimineto)</Text>
                                        <Text style ={{width: 120 ,  marginRight:20}}>Apellido Paterno</Text>
                                        <Text style ={{width: 120 ,  marginRight:20}}>Apellido Materno</Text>
                                        <Text style ={{width: 120 ,  marginRight:20}}>Nombre</Text>
                                    </View>


                                    <View style = {{ flex: 60,flexDirection: 'row',alignItems: 'flex-start' , backgroundColor:"blue"}}>
                                        <Text style={styles.text_0}>Domicilio:</Text>
                                        <div style={{borderBottom : 1,marginLeft:20,marginTop:1,marginBottom:0,width:"100%"}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] +" "+ informacion[1] +" "+ informacion[2]}</Text>
                                        </div>   
                                    </View>
                                    
                                    <View style = {{ flex: 60,flexDirection: 'row',alignItems: 'flex-start'  ,  marginTop:-25  , fontSize:8, textAlign: 'center',}}>
                                        <Text style={styles.text_2}></Text>
                                        <Text style={styles.textCentered}>Calle</Text>
                                        <Text style={styles.textCentered}>num. Int/ext</Text>
                                        <Text style={styles.textCentered}>Colonia o fracc</Text>
                                        <Text style={styles.textCentered}>C.P</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Municipio:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Lugar de nacimiento:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    

                                    <View style={styles.container}>
                                        <Text  style={{fontSize: 12, marginTop:1, marginLeft:2,marginRight:13}}>Fecha de nacimiento:</Text>
                                        <div style={styles.bordertext_2}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Edad:</Text>
                                        <div style={styles.bordertext_2}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>
                                        <Text style={styles.text_0}>Genero:</Text>

                                        <div style={styles.bordertext_genero}>
                                            <Text style={{fontSize: 10, marginTop:1, marginLeft:5}}>{"Masculino(x)"}</Text>
                                        </div>
                                        <div style={styles.bordertext_genero}>
                                            <Text style={{fontSize: 10, marginTop:1, marginLeft:-25}}>{"Femenino(x)"}</Text>
                                        </div>  
                                    </View>
                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>CURP:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Telefono cel:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Telefono casa:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Correo Electronico:</Text>
                                        <div style={styles.bordertext_1}>
                                            <Text style={styles.text_1}>{ " "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>En caso de emergencia comunicarse con:</Text>
                                        <div style={styles.bordertext_3 }>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                    </View>

                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Telefono cel:</Text>
                                        <div style={styles.bordertext}>
                                            <Text style={styles.text_1}>{" "+informacion[0] }</Text>
                                        </div>   
                                    </View>
                                    
                                    <Text style={styles.title}>*Formacion Academica</Text>

                                    <View style={styles.container}>
                                        <Text  style={{fontSize: 12, marginTop:1, marginLeft:2,marginRight:13}}>Último grado de estudios:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:40,marginTop:1,marginBottom:0,width:320}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
 

                                        <div style={styles.bordertext_genero}>
                                            <Text style={{fontSize: 10, marginTop:1, marginLeft:5}}>{"Estudiante (x)"}</Text>
                                        </div>
                                        <div style={styles.bordertext_genero}>
                                            <Text style={{fontSize: 10, marginTop:1, marginLeft:0}}>{"Pasante (x)"}</Text>
                                        </div>
                                        <div style={styles.bordertext_genero}>
                                            <Text style={{fontSize: 10, marginTop:1, marginLeft:0}}>{"Titulado(x)"}</Text>
                                        </div>  
                                    </View>
                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Institución educativa y/o de egreso :</Text>
                                        <div style={styles.bordertext_4}>
                                            <Text style={styles.text_1}>{ "Universidad Autonoma benito juarez de oaxaca  "}</Text>
                                        </div>  
                                    </View>
                                    
                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Año de egreso:</Text>
                                        <div style={styles.bordertext_5}>
                                            <Text style={styles.text_1}>{ "1234 " }</Text>
                                        </div>   
                                    </View>

                                    
                                    <Text style={styles.title}>*Datos del tutor</Text>

                                    <View style={styles.container}>
                                        <Text  style={{fontSize: 12, marginTop:1, marginLeft:2,marginRight:13}}>Nombre del tutor:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:10,marginTop:1,marginBottom:0,width:"100%"}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                    </View>
                                    
                                    <View style={styles.container}>
                                        <Text  style={{fontSize: 12, marginTop:1, marginLeft:2,marginRight:13}}>Nombre de la institución donde labora y puesto:</Text>
                                    </View>
                                    
                                    <View style={styles.container}>
                                        <div style={{   borderBottom : 1,marginLeft:0,marginTop:1,marginBottom:0,width:"100%"}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                    </View>

                                    

                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Correo electrónico:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginLeft:10,marginBottom:0,width:300}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Telefono cel:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginBottom:0,width:80}}>
                                            <Text style={styles.text_1}>{ "1234567890 " }</Text>
                                        </div>   
                                    </View>

                                    
                                    <Text style={styles.title}>*Para accesso vehicular</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Marca y Modelo:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginLeft:5,marginBottom:0,width:320}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Placas:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginBottom:0,width:100}}>
                                            <Text style={styles.text_1}>{ "1234567890 " }</Text>
                                        </div>   
                                    </View>
                                    <Text style={styles.title}>*DATOS PARA FACTURAR</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text_0}>Marca y Modelo:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginLeft:5,marginBottom:0,width:320}}>
                                            <Text style={styles.text_1}>{ " "+informacion[0]}</Text>
                                        </div>  
                                        <Text style={styles.text_0}>Placas:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginBottom:0,width:100}}>
                                            <Text style={styles.text_1}>{ "1234567890 " }</Text>
                                        </div>   
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