import React from 'react';
import { Container } from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import logo from "../static/LogoBN.jpg";
import imgTitulo from "../static/titulo.png";
import Moment from 'moment'
import Swal from 'sweetalert2'

class PDFAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curp: "",
            servicioAcademico: "",
            msg: "Primera aplicacion React",
            imagen_base64: "",
            informacion: [],
            datosPersonales: [],
            datosContactoEmer: [],
            datosLaborales: [],
            datoFormacionAcademica: [],
            datoInformacionAdiciona: [],
            datoLaboral:[]
        }
    }
    componentDidMount() {
        var curpid = this.props.params;
        curpid = curpid.value;
        var data = curpid.split(",");
        this.setState({ curp: data[0] });
        this.setState({ servicioAcademico: data[1] });
        this.getInfoAlmno_join(data[0]);
    }
    getInfoAlmno_join = async (curp) => {
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/AlumnoJoin";
        var bodyFormData = new FormData();
        bodyFormData.append('curp', curp);
        const respuesta = await axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: error.message,
            })
        })
        let arrayPersonales = [];
        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('DD/MM/YYYY');
        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('MM-DD-YYYY');
        // var dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('MM-DD-YYYY');
        let dateNacimiento;
        let nacimiento;
        let  hoy;
        let anios;
        dateNacimiento = Moment(respuesta[0][0].fechanacimiento, ["MM-DD-YYYY", "YYYY-MM-DD" , "DD/MM/YYYY"]);
        nacimiento = Moment(dateNacimiento);
        hoy = Moment();
        anios = hoy.diff(nacimiento, "years");

        dateNacimiento = new Moment(respuesta[0][0].fechanacimiento).format('DD/MM/YYYY');

        if (anios == NaN  || (anios ===undefined)){
            dateNacimiento = new Moment(respuesta[0][0].fechanacimiento,).format('DD/MM/YYYY');
            nacimiento = Moment(dateNacimiento);
            hoy = Moment();
            anios = hoy.diff(nacimiento, "years");    
        }
        if (anios == NaN  || (anios ===undefined)){
            anios =" ";
        }

        arrayPersonales.push(respuesta[0][0].nombre);
        arrayPersonales.push(respuesta[0][0].appmat);
        arrayPersonales.push(respuesta[0][0].apppat);
        arrayPersonales.push(respuesta[0][0].calle);
        arrayPersonales.push(respuesta[0][0].numdomicilio);
        arrayPersonales.push(respuesta[0][0].colonia);
        arrayPersonales.push(respuesta[0][0].codigopostal);
        arrayPersonales.push(respuesta[0][0].municipio);
        arrayPersonales.push(respuesta[0][0].lugarnacimiento);
        arrayPersonales.push(dateNacimiento);
        arrayPersonales.push(anios);
        arrayPersonales.push(respuesta[0][0].sexo);
        arrayPersonales.push(respuesta[0][0].curp);
        arrayPersonales.push(respuesta[0][0].telcel);
        arrayPersonales.push(respuesta[0][0].telpar);
        arrayPersonales.push(respuesta[0][0].email);

        let datosContactoEmer = [];

        datosContactoEmer.push(respuesta[1][0].nombre);
        datosContactoEmer.push(respuesta[1][0].apppat);
        datosContactoEmer.push(respuesta[1][0].appmat);
        datosContactoEmer.push(respuesta[1][0].email);
        datosContactoEmer.push(respuesta[1][0].telefono_contacto);


        let datoFormacionAcademica = [];
        datoFormacionAcademica.push(respuesta[2][0].n_max_estudios);
        datoFormacionAcademica.push(respuesta[2][0].s_academica_actual);
        datoFormacionAcademica.push(respuesta[2][0].sistemaeducativoprocedencia);
        datoFormacionAcademica.push(respuesta[2][0].sistemaeducativoprocedenciaotro);
        datoFormacionAcademica.push(respuesta[2][0].insteducativa);
        datoFormacionAcademica.push(respuesta[2][0].anioegreso);
        datoFormacionAcademica.push(respuesta[2][0].uniaspiraingresar);
        datoFormacionAcademica.push(respuesta[2][0].carreraraspirasingresar);


        let datoInformacionAdiciona = [];
        datoInformacionAdiciona.push(respuesta[4][0].marca_modelo_vehiculo);
        datoInformacionAdiciona.push(respuesta[4][0].placas_vehiculo);
        datoInformacionAdiciona.push(respuesta[4][0].comoseenterodelcuros);
        datoInformacionAdiciona.push(respuesta[4][0].comoseenterodelcurosotro);
        datoInformacionAdiciona.push(respuesta[4][0].recomendacion_nombre);
        datoInformacionAdiciona.push(respuesta[4][0].recomendacion_email);
        datoInformacionAdiciona.push(respuesta[4][0].recomendacion_telcel);


        let datoLaboral = [];
        datoLaboral.push(respuesta[3][0].nombre_institucion);
        datoLaboral.push(respuesta[3][0].direccion);
        datoLaboral.push(respuesta[3][0].puesto);
        datoLaboral.push(respuesta[3][0].telefono);



        // this.setState({ datosContactoEmer:  arrayInfo});
        // this.setState({ datosLaborales:  arrayInfo});
        // this.setState({ datoFormacionAcademica:  arrayInfo});


        url = config.general[0].url + config.general[0].puerto_api + "/Api/imagen64";
        const imagen = await axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            // headers: {'content-type': 'multipart/form-data'}
            headers: { 'Content-Type': 'application/json' }

        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: error.message,
            })
        })

        this.setState({ imagen_base64: imagen.message });
        this.setState({ datosPersonales: arrayPersonales });
        this.setState({ datosContactoEmer: datosContactoEmer });
        this.setState({ datoFormacionAcademica: datoFormacionAcademica });
        this.setState({ datoInformacionAdiciona: datoInformacionAdiciona });
        this.setState({ datoLaboral: datoLaboral });

    }
    render() {
        let { imagen_base64 } = this.state
        let { datosPersonales } = this.state
        let { datosContactoEmer } = this.state
        let { datoFormacionAcademica } = this.state
        let { servicioAcademico } = this.state
        let { datoInformacionAdiciona } = this.state
        let { datoLaboral } = this.state
        
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
                fontSize: 13,
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
                textTransform: 'uppercase',

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
                textTransform: 'uppercase',

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

                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={{ alignSelf: 'flex-start', width: 60, height: 70 }}
                                        src={logo}
                                    />
                                    <Image
                                        style={{ width: "80%", height: 60, marginLeft: 10, marginRight: 5 }}
                                        src={imgTitulo}
                                    />
                                    <View style={{ flexDirection: 'row', border: 0.9, width: 180 }}>
                                        <View style={{ alignItems: 'flex-start', color: 'black', fontSize: 10, padding: 4 }} >
                                            <Text>Nivel:</Text>
                                            <Text style={{ borderBottom: 0.8, width: "140%" }}> </Text>

                                            <Text>M??dulo:</Text>
                                            <Text style={{ borderBottom: 0.8, width: "140%" }}> </Text>

                                        </View>
                                        <Image
                                            style={{ marginLeft: 'auto', width: 70, height: 60 }}
                                            source={{ uri: imagen_base64 }}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.title}>Solicitud de inscripci??n</Text>
                                <Text style={styles.title}>{servicioAcademico}</Text>
                                <View style={styles.mainContainer}>

                                    <Text style={styles.title}>*Datos personales</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Nombre completo:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 20, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[2] + " " + datosPersonales[1] + " " + datosPersonales[0]}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text4}>(Segun acta de nacimineto)</Text>
                                        <Text style={styles.text4}>Apellido Paterno</Text>
                                        <Text style={styles.text4} >Apellido Materno</Text>
                                        <Text style={styles.text4}>Nombre</Text>
                                    </View>


                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Domicilio:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 10, width: "100%" }}>
                                            <Text style={styles.text2}>{"  " + datosPersonales[3] + "  " + datosPersonales[4] + " " + datosPersonales[5] + "            " + datosPersonales[6]}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={{ marginLeft: 10 }}></Text>
                                        <Text style={styles.text4}>Calle</Text>
                                        <Text style={styles.text4}>num. Int/ext</Text>
                                        <Text style={styles.text4}>Colonia o fracc</Text>
                                        <Text style={styles.text4}>C.P</Text>
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Municipio:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 30, width: "40%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[7]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Lugar de nacimiento:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 45, width: "60%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[8]}</Text>
                                        </div>
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Fecha de nacimiento:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 15, width: 180 }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[9]}</Text>
                                        </div>
                                        <Text style={styles.text1}>{" "}Edad:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 2, width: 25 }}>
                                            <Text style={styles.text2}>{" "+datosPersonales[10]}</Text>
                                        </div>
                                        <Text style={styles.text1}>{" "}Genero:</Text>

                                        {
                                            datosPersonales[11] === 'Hombre' ?
                                                <Container style={styles.container}>
                                                    <div style={{ marginLeft: 10, width: 100 }}>
                                                        <Text style={{ fontSize: 10, marginLeft: 5 }}>{"Masculino(x)"}</Text>
                                                    </div>
                                                    <div style={{ marginLeft: 10, width: 100 }}>
                                                        <Text style={{ fontSize: 10, marginLeft: -25 }}>{"Femenino( )"}</Text>
                                                    </div>
                                                </Container>

                                                :
                                                <Container style={styles.container} >
                                                    <div style={{ marginLeft: 10, width: 100 }}>
                                                        <Text style={{ fontSize: 10, marginLeft: 5 }}>{"Masculino( )"}</Text>
                                                    </div>
                                                    <div style={{ marginLeft: 10, width: 100 }}>
                                                        <Text style={{ fontSize: 10, marginLeft: -25 }}>{"Femenino(x)"}</Text>
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
                                        <div style={{ borderBottom: 1, marginLeft: 23, width: "60%",  textTransform: 'uppercase', }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[12]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Telefono cel:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 45, width: "80%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[13]}</Text>
                                        </div>
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Telefono casa:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 40, width: "40%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[14]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Correo Electronico:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 50, width: "60%" }}>
                                            <Text style={styles.text2}>{" " + datosPersonales[15]}</Text>
                                        </div>
                                    </View>

                                    {/* 
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
                                    </View> */}


                                    <Text style={styles.title}>*Formacion Academica</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>??ltimo grado de estudios:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: 230 }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[0]}</Text>
                                        </div>

                                        <div>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[1]}</Text>
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
                                        <Text style={styles.text1}>Sistema educativo de procedencia :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 80, width: '100%' }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[2]}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Otro :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: '100%' }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[3]}</Text>
                                        </div>
                                    </View>

                                    {/* <View style={styles.container}>
                                        <Text style={styles.text1}>Instituci??n educativa y/o de egreso :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 30, width: 280 }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[4]}</Text>
                                        </div>
                                        <Text style={styles.text1}>A??o de egreso:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 2, width: 42 }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[5]}</Text>
                                        </div>
                                    </View> */}
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Instituci??n educativa y/o de egreso :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 35, width: 250 }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[4]}</Text>
                                        </div>
                                        <Text style={styles.text1}>A??o de egreso:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 15, width: 42 }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[5]}</Text>
                                        </div>
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Universidad a la que aspiras ingresar :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 90, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[6]}</Text>
                                        </div>

                                    </View>
                                    <View style={styles.container}>

                                        <Text style={styles.text1}>Carrera a la que aspiras ingresar :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 80, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + datoFormacionAcademica[7]}</Text>
                                        </div>
                                    </View>

                                    <Text style={styles.title}>*Contacto de emergencia</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Nombre:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 15, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + datosContactoEmer[0] + "  " + datosContactoEmer[1] + " " + datosContactoEmer[2]}</Text>
                                        </div>
                                    </View>

                                    {/* <View style={styles.container}>
                                        <Text  style={styles.text1}>Nombre de la instituci??n donde labora y puesto:</Text>
                                        <div style={{   borderBottom : 1,marginLeft:82,width:"100%"}}>
                                            <Text style={styles.text2}>{ " "}</Text>
                                        </div>  
                                    </View> */}

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Correo electr??nico:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 20, width: 300 }}>
                                            <Text style={styles.text2}>{" "+datosContactoEmer[3]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Telefono cel:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 10, width: 110 }}>
                                            <Text style={styles.text2}>{" "+datosContactoEmer[4]}</Text>
                                        </div>
                                    </View>




                                    <Text style={styles.title}>*Datos laborales</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Nombre de la instituci??n :</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 65, width: "40%" }}>
                                            <Text style={styles.text2}>{" "+datoLaboral[0]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Direccion:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 30, width: "70%" }}>
                                            <Text style={styles.text2}>{" "+datoLaboral[1]}</Text>
                                        </div>
                                    </View>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Puesto:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 15, width: "80%" }}>
                                            <Text style={styles.text2}>{" "+datoLaboral[2]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Telefono:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 10, width: "110" }}>
                                            <Text style={styles.text2}>{" "+datoLaboral[3]}</Text>
                                        </div>
                                    </View>









                                    <Text style={styles.title}>*Para accesso vehicular</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Marca y Modelo:</Text>
                                        <div style={{ borderBottom: 1, marginTop: 1, marginLeft: 10, marginBottom: 0, width: 340 }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[0]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Placas:</Text>
                                        <div style={{ borderBottom: 1, marginTop: 1, marginBottom: 0,  marginLeft: 10,width: 110 }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[1]}</Text>
                                        </div>
                                    </View>


                                    <Text style={styles.title}>*DATOS PARA FACTURAR</Text>

                                    <View style={styles.container}>
                                        <Text style={styles.text1}>??Requiere factura electronica?</Text>
                                        <Text style={styles.text1}>No </Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: 30 }}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>
                                        <Text style={styles.text1}>Si</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: 30 }}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>
                                        <Text style={styles.text1}>Anexa Cedula Fiscal: </Text>
                                        <Text style={styles.text1}>No </Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: 30 }}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>
                                        <Text style={styles.text1}>Si</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 5, width: 30 }}>
                                            <Text style={styles.text1}>{" "}</Text>
                                        </div>
                                    </View>

                                    <Text style={styles.title}>*Informacion adicional</Text>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}> ??Como se entero del curso? </Text>
                                        <div style={{ borderBottom: 1, marginLeft: 50, width: "100%" }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[2]}</Text>
                                        </div>
                                        {/* <div>
                                            <Text style={{fontSize: 10, marginLeft:10}}>{"Cartel( ) , "}</Text>
                                        </div>
                                       
                                        <div>
                                            <Text style={{fontSize: 10, marginLeft:5}}>{"Radio( ) , "}</Text>
                                        </div> */}
                                    </View>
                                    {/* <View style={styles.container}>
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
                                       
                                    </View> */}
                                    {/* <View style={styles.container}>
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
                                    </View> */}
                                    <View style={styles.container}>
                                        <div>
                                            <Text style={{ fontSize: 10, marginLeft: 0 }}>{"Otro medio , especificar"}</Text>
                                        </div>
                                        <div style={{ borderBottom: 1, marginLeft: 30, width: "100%" }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[3]}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}> ??A quien recomendaria este curso?  </Text>
                                        <Text style={{ fontSize: 10,
                textAlign: 'center',
                alignItems: 'center',
                textTransform: 'uppercase',marginLeft: 40}} > Nombre: </Text>
                                        <div style={{ borderBottom: 1, marginLeft: 10, width: "63%" }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[4]}</Text>
                                        </div>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Correo electronico:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 20, width: "60%" }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[5]}</Text>
                                        </div>
                                        <Text style={styles.text1}>Tel. cel:</Text>
                                        <div style={{ borderBottom: 1, width: "20%", marginLeft: 8 }}>
                                            <Text style={styles.text2}>{" "+datoInformacionAdiciona[6]}</Text>
                                        </div>
                                    </View>

                                    <Text style={styles.title}>??Importante!</Text>
                                    <Text style={{ fontSize: 6, textAlign: "justify" }}>
                                        El Centro de Educaci??n Continua Unidad Oaxaca se reserva el derecho de cancelar o posponer el programa acad??mico si no se
                                        cumple con el m??nimo de participantes a la fecha de inicio del programa. Por favor, lea lo siguiente y firme.
                                        {"\n \n"}
                                        En cumplimiento del Decimos??ptimo de los Lineamientos de Protecci??n de Datos Personales, publicados en el Diario Oficial de la Federaci??n el 30
                                        de septiembre de 2005 se informa lo siguiente: Los datos personales recabados ser??n protegidos y ser??n incorporados y tratados en el Sistema de datos
                                        personales Datos del Participante, con fundamento en los art??culos 20, 21 de la LFTAIPG; 16??, 17??, 27??, 28??, 29?? , 30??, 31??, 32??, 33??, de los
                                        Lineamientos de Protecci??n de Datos Personales; cuya finalidad es integrar los expedientes de los participantes a los servicios educativos del CEC Unidad Oaxaca,
                                        mismo que fue registrado en el Listado de sistemas de datos personales ante el Instituto Federal de Acceso a la Informaci??n P??blica (www.ifai.org.mx), y podr??n ser
                                        transmitidos a la Direcci??n de Educaci??n Continua o a la Escuela Superior del IPN de donde provenga el programa acad??mico en el que fue inscrito, con la finalidad de
                                        que se elabore el documento definitivo que oficializa su participaci??n en programas y eventos de educaci??n continua y a distancia, adem??s de otras transmisiones previas en la Ley.
                                        La Unidad Administrativa responsable del Sistema de datos personales es el Centro de Educaci??n Continua Unidad Oaxaca y la direcci??n donde el interesado podr?? ejercer los derechos de acceso
                                        y correcci??n ante la misma en calle Hornos No. 1003 Santa Cruz Xoxocotl??n Oaxaca, Oax. Tel.(951) 51 727 45 y 533 53 47.
                                    </Text>
                                    <Text>{"\n"}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        // backgroundColor: 'blue',
                                        marginBottom: 0,
                                        margin: 0,
                                        marginTop : 5
                                        // marginBottom:20  
                                    }}>

                                        <div style={{ borderTop: 1, marginLeft: 5, width: "32%" }}>
                                            <Text style={{ fontSize: 8, textAlign: 'center', }}>Fecha</Text>
                                        </div>
                                        <div style={{ borderTop: 1, marginLeft: 5, width: "32%" }}>
                                            <Text style={{ fontSize: 8, textAlign: 'center' }}>Nombre y firma del solicitante</Text>
                                        </div>
                                        <div style={{ borderTop: 1, marginLeft: 5, marginright: 5, width: "32%" }}>
                                            <Text style={{ fontSize: 8, textAlign: 'center' }}>Nombre y firma de quien recibe la solicitud</Text>
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