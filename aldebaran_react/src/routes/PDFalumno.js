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
class PDFAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curp:"",
            msg: "Primera aplicacion React",
            imagen_base64:"",
            informacion:[],
            datosPersonales:[],
            datosContactoEmer:[],
            datosLaborales:[],
            datoFormacionAcademica:[],
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
        let arrayPersonales = [];

        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('DD/MM/YYYY');
        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('MM-DD-YYYY');
        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('MM-DD-YYYY');

        var dateNacimiento = Moment(respuesta[0][0].fechanacimiento, ["MM-DD-YYYY", "YYYY-MM-DD"]);

        var nacimiento=Moment(dateNacimiento);
        var hoy=Moment();
        var anios=hoy.diff(nacimiento,"years");

        arrayPersonales.push(respuesta[0][0].nombre);
        arrayPersonales.push(respuesta[0][0].appmat);
        arrayPersonales.push(respuesta[0][0].apppat);
        arrayPersonales.push(respuesta[0][0].calle);
        arrayPersonales.push(respuesta[0][0].numdomicilio);
        arrayPersonales.push(respuesta[0][0].colonia);
        arrayPersonales.push(respuesta[0][0].codigopostal);
        arrayPersonales.push(respuesta[0][0].municipio);
        arrayPersonales.push("Aqui va el lugar de nacimiento");
        arrayPersonales.push(dateNacimiento);
        arrayPersonales.push(anios);
        arrayPersonales.push(respuesta[0][0].sexo);
        arrayPersonales.push(respuesta[0][0].curp);
        arrayPersonales.push(respuesta[0][0].telcel);
        arrayPersonales.push(respuesta[0][0].telpar);
        arrayPersonales.push(respuesta[0][0].email);

        let datosContactoEmer = [];
      
        datosContactoEmer.push(respuesta[1][0].nombre);
        datosContactoEmer.push(respuesta[1][0].appmat);
        datosContactoEmer.push(respuesta[1][0].apppat);
        datosContactoEmer.push(respuesta[1][0].email);
        datosContactoEmer.push(respuesta[1][0].telefono_contacto);
     
        let datoFormacionAcademica = [];
        console.log("Data");
        console.log(respuesta);
        console.log(respuesta[2][0]);
        datoFormacionAcademica.push(respuesta[2][0].n_max_estudios);
        datoFormacionAcademica.push(respuesta[2][0].s_academica_actual);
        datoFormacionAcademica.push(respuesta[2][0].insteducativa);
        datoFormacionAcademica.push(respuesta[2][0].anioegreso);
        


        // this.setState({ datosContactoEmer:  arrayInfo});
        // this.setState({ datosLaborales:  arrayInfo});
        // this.setState({ datoFormacionAcademica:  arrayInfo});
        

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
        this.setState({ datosPersonales:  arrayPersonales});
        this.setState({ datosContactoEmer:  datosContactoEmer});
        this.setState({ datoFormacionAcademica:  datoFormacionAcademica});

    }
    render() {
        let { imagen_base64 } = this.state
        let { datosPersonales } = this.state
        let { datosContactoEmer } = this.state
        let { datoFormacionAcademica } = this.state
        
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
            mainContainer:{
               height: "100%" , marginTop:5
            },
            container: {
                flexDirection: 'row',
                alignItems: 'flex-start', //replace with flex-end or center,
                // backgroundColor: 'blue',
                marginBottom:5
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
            text1: {             
                fontSize: 10,
                textAlign: 'center',
                alignItems: 'center',
            },
            text2: {             
                fontSize: 10,
                color:"#303f9f"
            },
            text3: {
                fontSize: 8,
                textAlign: 'center',
                fontFamily: 'Oswald',
                alignItems: 'center',
                textDecoration: 'underline',
            },
            text4:{
                width: 120 ,  marginRight:20,
                fontSize:8, textAlign: 'center'
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

                                <View style={{flexDirection: 'row' }}>
                                    <Image 
                                        style={{alignSelf: 'flex-start' , width:60 , height:70}}
                                        src={logo}
                                    />
                                    <Image 
                                        style={{width:"80%" , height:60 , marginLeft:10 , marginRight:5}}
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
                                            style={{marginLeft: 'auto' , width:70 , height:60}}
                                            source={{uri: imagen_base64}}
                                        />
                                    </View>
                                </View>
                                
                                <Text style={styles.title}>Solicitud de inscripción</Text>
                                <Text style={styles.title}>{"Falta agregar el Curso"}</Text>
                                <View style={styles.mainContainer}>

                                    <Text style={styles.title}>*Datos personales</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Nombre completo:</Text>
                                        <div style={{borderBottom : 1,marginLeft:20,width:"100%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[2] +" "+ datosPersonales[1] +" "+ datosPersonales[0]}</Text>
                                        </div>   

                                    </View>
                                    <View style = {styles.container}>
                                        <Text style ={styles.text4}>(Segun acta de nacimineto)</Text>
                                        <Text style ={styles.text4}>Apellido Paterno</Text>
                                        <Text style ={styles.text4} >Apellido Materno</Text>
                                        <Text style ={styles.text4}>Nombre</Text>
                                    </View>


                                    <View style = {styles.container }>
                                    <Text style={styles.text1}>Domicilio:</Text>
                                        <div style={{borderBottom : 1,marginLeft:10,width:"100%"}}>
                                            <Text style={styles.text2}>{ "  "+datosPersonales[3] +"  "+ datosPersonales[4] +" "+ datosPersonales[5] +"            "+ datosPersonales[6]}</Text>
                                        </div>   
                                    </View>
                                    <View style = {styles.container }>
                                        <Text style={{marginLeft:10}}></Text>
                                        <Text style={styles.text4}>Calle</Text>
                                        <Text style={styles.text4}>num. Int/ext</Text>
                                        <Text style={styles.text4}>Colonia o fracc</Text>
                                        <Text style={styles.text4}>C.P</Text>
                                    </View> 

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Municipio:</Text>
                                        <div style={{borderBottom : 1,marginLeft:23,width:"60%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[7]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Lugar de nacimiento:</Text>
                                        <div style={{borderBottom : 1,marginLeft:45,width:"80%"}}>
                                            <Text style={styles.text2}>{" "+datosPersonales[8] }</Text>
                                        </div>   
                                    </View> 

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Fecha de nacimiento:</Text>
                                        <div style={{borderBottom : 1,marginLeft:10,width:180}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[9]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>{" "}Edad:</Text>
                                        <div style={{borderBottom : 1,marginLeft:2,width:25}}>
                                            <Text style={styles.text2}>{ datosPersonales[10]}</Text>
                                        </div>
                                        <Text style={styles.text1}>{" "}Genero:</Text>

                                        { 
                                            datosPersonales[11] === 'Hombre' ?
                                                <Container style={styles.container}>
                                                    <div style={{marginLeft:10 , width:100}}>
                                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Masculino(x)"}</Text>
                                                    </div>
                                                    <div style={{marginLeft:10,width:100}}>
                                                        <Text style={{fontSize: 10, marginLeft:-25}}>{"Femenino( )"}</Text>
                                                    </div>  
                                                </Container>

                                            :  
                                                <Container style={styles.container} >
                                                    <div style={{marginLeft:10 , width:100}}>
                                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Masculino( )"}</Text>
                                                    </div>
                                                    <div style={{marginLeft:10,width:100}}>
                                                        <Text style={{fontSize: 10, marginLeft:-25}}>{"Femenino(x)"}</Text>
                                                    </div>  
                                                </Container>
                                              
                                        }
                                        {/* <div style={{marginLeft:10 , width:100}}>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Masculino(x)"}</Text>
                                        </div>
                                        <div style={{marginLeft:10,width:100}}>
                                            <Text style={{fontSize: 10, marginLeft:-25}}>{"Femenino(x)"}</Text>
                                        </div>   */}

                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>CURP:</Text>
                                        <div style={{borderBottom : 1,marginLeft:23,width:"60%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[12]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Telefono cel:</Text>
                                        <div style={{borderBottom : 1,marginLeft:45,width:"80%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[13] }</Text>
                                        </div>   
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Telefono casa:</Text>
                                        <div style={{borderBottom : 1,marginLeft:28,width:"40%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[14]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Correo Electronico:</Text>
                                        <div style={{borderBottom : 1,marginLeft:35,width:"60%"}}>
                                            <Text style={styles.text2}>{ " "+datosPersonales[15] }</Text>
                                        </div>   
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>En caso de emergencia comunicarse con:</Text>
                                        <div style={{borderBottom : 1,marginLeft:65,width:"100%"}}>
                                            <Text style={styles.text2}>{ " "+datosContactoEmer[0] +"  "+ datosContactoEmer[1] +" "+ datosContactoEmer[2]}</Text>
                                        </div>  
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Telefono cel:</Text>
                                        <div style={{borderBottom : 1,marginLeft:10, width:"100%"}}>
                                            <Text style={styles.text2}>{" "+datosContactoEmer[4] }</Text>
                                        </div>   
                                    </View>


                                    <Text style={styles.title}>*Formacion Academica</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Último grado de estudios:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5,width:230}}>
                                            <Text style={styles.text2}>{ " "+datoFormacionAcademica[0]}</Text>
                                        </div>  

                                        <div>
                                            <Text style={styles.text2}>{ " "+datoFormacionAcademica[1]}</Text>
                                        </div>
                                        {/* <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Estudiante (x)"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Pasante (x)"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10,marginLeft:5}}>{"Titulado(x)"}</Text>
                                        </div>   */}

                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Institución educativa y/o de egreso :</Text>
                                        <div style={{borderBottom : 1,marginLeft:2,width:280}}>
                                        <Text style={styles.text2}>{" "+ datoFormacionAcademica[2]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Año de egreso:</Text>
                                        <div style={{borderBottom : 1,marginLeft:2,width:42}}>
                                            <Text style={styles.text2}>{ " "+datoFormacionAcademica[3] }</Text>
                                        </div>
                                    </View>


                                      
                                    <Text style={styles.title}>*Datos del tutor</Text>

                                    <View style={styles.container}>
                                        <Text  style={styles.text1}>Nombre del tutor:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:15,width:"100%"}}>
                                            <Text style={styles.text2}>{ " "}</Text>
                                        </div>  
                                    </View>
                                    
                                    <View style={styles.container}>
                                        <Text  style={styles.text1}>Nombre de la institución donde labora y puesto:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:82,width:"100%"}}>
                                            <Text style={styles.text2}>{ " "}</Text>
                                        </div>  
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Correo electrónico:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5,width:300}}>
                                            <Text style={styles.text2}>{ " "}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Telefono cel:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5 , width:110}}>
                                            <Text style={styles.text2}>{ " " }</Text>
                                        </div>   
                                    </View>

                                    <Text style={styles.title}>*Para accesso vehicular</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Marca y Modelo:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginLeft:5,marginBottom:0,width:340}}>
                                            <Text style={styles.text2}>{" "}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Placas:</Text>
                                        <div style={{   borderBottom : 1, marginTop:1,marginBottom:0,width:110}}>
                                            <Text style={styles.text2}>{" "}</Text>
                                        </div>   
                                    </View>


                                    <Text style={styles.title}>*DATOS PARA FACTURAR</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>¿Requiere factura electronica?</Text>
                                        <Text style={styles.text1}>No </Text>
                                        <div style={{borderBottom : 1,marginLeft:5, width:30}}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Si</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5 , width:30}}>
                                            <Text style={styles.text1}>{ " " }</Text>
                                        </div>  
                                        <Text style={styles.text1}>Anexa Cedula Fiscal: </Text>
                                        <Text style={styles.text1}>No </Text>
                                        <div style={{borderBottom : 1,marginLeft:5, width:30}}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Si</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5 , width:30}}>
                                            <Text style={styles.text1}>{ " " }</Text>
                                        </div>  
                                    </View>

                                    <Text style={styles.title}>*Informacion adicional</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Marca con una x la opcion que consideres correcta ¿Como se entero del curso? </Text>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:10}}>{"Cartel( ) , "}</Text>
                                        </div>
                                       
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Radio( ) , "}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                    <Text style={styles.text1}>Redes sociales: </Text>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Facebook( ) ,"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"twitter( ) ,"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Pagina web( ) , "}</Text>
                                        </div>
                                       
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Visita en lugar de trabajo( ), "}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Familiar/res o amigos( ) ,"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Stand o feria( ), "}</Text>
                                        </div>
                                       
                                    </View>
                                    <View style={styles.container}>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:0}}>{"Periodico( ), "}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Llamada telefonica( ) ,"}</Text>
                                        </div>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Correo electronico( ) ,"}</Text>
                                        </div>   
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"En instalaciones del CEC( ) ,"}</Text>
                                        </div>       
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Engresado del CEC-IPN( ) ,"}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:0}}>{"Television( ) ,"}</Text>
                                        </div>  
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Otro medio , especificar"}</Text>
                                        </div>         
                                        <div style={{   borderBottom : 1,marginLeft:5 , width:400}}>
                                            <Text style={styles.text1}>{ " " }</Text>
                                        </div>  
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}> ¿A quien recomendaria este curso?  </Text>
                                        <Text style={styles.text1}>Nombre: </Text>
                                        <div style={{borderBottom : 1,marginLeft:0,width:"63%"}}>
                                            <Text style={styles.text2}>{" "}</Text>
                                        </div>   
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Correo electronico:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:5,width:330}}>
                                            <Text style={styles.text2}>{" "}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Tel. cel:</Text>
                                        <div style={{   borderBottom : 1,width:110 , marginLeft:5}}>
                                            <Text style={styles.text2}>{" "}</Text>
                                        </div>   
                                    </View>

                                    <Text style={styles.title}>¡Importante!</Text>
                                    <Text  style={{fontSize: 6 , textAlign:"justify"}}>
                                        El Centro de Educación Continua Unidad Oaxaca se reserva el derecho de cancelar o posponer el programa académico si no se 
                                        cumple con el mínimo de participantes a la fecha de inicio del programa. Por favor, lea lo siguiente y firme.
                                        {"\n \n"}
                                        En cumplimiento del Decimoséptimo de los Lineamientos de Protección de Datos Personales, publicados en el Diario Oficial de la Federación el 30 
                                        de septiembre de 2005 se informa lo siguiente: Los datos personales recabados serán protegidos y serán incorporados y tratados en el Sistema de datos 
                                        personales Datos del Participante, con fundamento en los artículos 20, 21 de la LFTAIPG; 16º, 17º, 27º, 28º, 29º , 30º, 31º, 32º, 33º, de los 
                                        Lineamientos de Protección de Datos Personales; cuya finalidad es integrar los expedientes de los participantes a los servicios educativos del CEC Unidad Oaxaca,
                                        mismo que fue registrado en el Listado de sistemas de datos personales ante el Instituto Federal de Acceso a la Información Pública (www.ifai.org.mx), y podrán ser 
                                        transmitidos a la Dirección de Educación Continua o a la Escuela Superior del IPN de donde provenga el programa académico en el que fue inscrito, con la finalidad de 
                                        que se elabore el documento definitivo que oficializa su participación en programas y eventos de educación continua y a distancia, además de otras transmisiones previas en la Ley. 
                                        La Unidad Administrativa responsable del Sistema de datos personales es el Centro de Educación Continua Unidad Oaxaca y la dirección donde el interesado podrá ejercer los derechos de acceso 
                                        y corrección ante la misma en calle Hornos No. 1003 Santa Cruz Xoxocotlán Oaxaca, Oax. Tel.(951) 51 727 45 y 533 53 47.
                                    </Text>
                                    <Text>{"\n"}</Text>

                                    <View style={{
                                          flexDirection: 'row',
                                          // backgroundColor: 'blue',
                                          marginBottom:5,
                                          margin: 0,
                                          // marginBottom:20  
                                    }}>

                                        <div style={{borderTop : 1  ,marginLeft:5, width:"32%"}}>
                                            <Text style={{fontSize:8, textAlign: 'center',}}>Fecha</Text>
                                        </div>   
                                        <div style={{borderTop : 1 ,  marginLeft:5 ,  width:"32%" }}>
                                            <Text style={{fontSize:8, textAlign: 'center'}}>Nombre y firma del solicitante</Text>
                                        </div> 
                                        <div style={{borderTop : 1 ,marginLeft:5,marginright:5,  width:"32%" }}>
                                            <Text style={{ fontSize:8, textAlign: 'center'}}>Nombre y firma de quien recibe la solicitud</Text>                                        
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