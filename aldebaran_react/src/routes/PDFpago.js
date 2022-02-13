import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import logo from "../static/LogoBN.jpg";
import imgTitulo from "../static/titulo.png";
import Moment from 'moment'
import Swal from 'sweetalert2'



// import styled from 'styled-components'
class PDFPago extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Primera aplicacion React",
            pagos: [],
            alumno:[],
            servicio:[],
            folio:""

        }
    }
    componentDidMount() {
        var parametros = this.props.params;
        this.setState({ folio: parametros.value });

        this.getDataServicios(parametros.value);
    }
    getDataServicios = async (idServicio) => {
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/DataPagosPDF";
        var bodyFormData = new FormData();
        bodyFormData.append('idPago', idServicio);
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

        var pagos = respuesta.pago;
        var alumno = respuesta.alumno;
        var servicio = respuesta.servicio;

        let arrayPago = [];
        let arrayAlumno = [];
        let arrayServicios = [];

        // Extracion de data del alumno
        arrayAlumno.push(alumno[0].curp);
        arrayAlumno.push(alumno[0].nombre);
        arrayAlumno.push(alumno[0].apppat);
        arrayAlumno.push(alumno[0].appmat);

        // Extraccion de data del servicio
        arrayServicios.push(servicio[0].programa_academico);
        arrayServicios.push(servicio[0].registro_academico);
        arrayServicios.push(servicio[0].tipo_evento);

        // Extraccion de data del Pagos
        arrayPago.push(pagos[0].referencia);
        arrayPago.push(pagos[0].nummodulo);
        arrayPago.push(pagos[0].facturacion);
        var fechahoraticket = new Moment(pagos[0].fechahoraticket).format('DD/MM/YYYY HH:mm');
        arrayPago.push(fechahoraticket);

        var fechahoraregistro = new Moment(pagos[0].fechahoraregistro).format('DD/MM/YYYY HH:mm');
        arrayPago.push(fechahoraregistro);

        var fecha_inicio = new Moment(pagos[0].fecha_inicio).format('DD/MM/YYYY HH:mm');
        arrayPago.push(fecha_inicio);

        var fecha_termino = new Moment(pagos[0].fecha_termino).format('DD/MM/YYYY HH:mm');
        arrayPago.push(fecha_termino);

        arrayPago.push(pagos[0].cantidad);


        this.setState({ pagos: arrayPago });
        this.setState({ alumno: arrayAlumno });
        this.setState({ servicio: arrayServicios });



    }
    render() {
        let { pagos } = this.state
        let { alumno } = this.state
        let { servicio } = this.state
        let { folio } = this.state
        
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
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={{ alignSelf: 'flex-start', width: 60, height: 70 }}
                                        src={logo}
                                    />
                                    <Image
                                        style={{ width: "80%", height: 60, marginLeft: 10, marginRight: 5 }}
                                        src={imgTitulo}
                                    />
                                </View>

                                <Text >{" \n "}  </Text>
                                <View style={styles.container}>
                                    
                                <Text style={styles.text1}>{ "Numero de folio : "+ folio }</Text>

                                </View>
                                <View style={styles.container}>
                                    
                                    <View style={styles.container}>
                                        <Text style={styles.text1}>Curp:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 20, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + alumno[0]}</Text>
                                        </div>

                                    </View>
                                </View>
                                <View style={styles.container}>
                                        <Text style={styles.text1}>Nombre del alumno:</Text>
                                        <div style={{ borderBottom: 1, marginLeft: 20, width: "100%" }}>
                                            <Text style={styles.text2}>{" " + alumno[1] + " " + alumno[2] + " " + alumno[3]}</Text>
                                        </div>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}>Programa academico:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 20, width: "100%" }}>
                                        <Text style={styles.text2}>{" " + servicio[0]}</Text>
                                    </div>
                                    
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}>Registro academico:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 20, width: "100%" }}>
                                        <Text style={styles.text2}>{" " + servicio[1]}</Text>
                                    </div>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}>Tipo de evento:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 20, width: "50%" }}>
                                        <Text style={styles.text2}>{" " + servicio[2]}</Text>
                                    </div>
                                    <Text style={styles.text1}>Referencia:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 20, width: "50%" }}>
                                        <Text style={styles.text2}>{" " + pagos[0]}</Text>
                                    </div>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}>Modulo:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 20, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[1]}</Text>
                                    </div>
                                    <Text style={styles.text1}> ¿Requiere factura electrónica? </Text>
                                    <div style={{ borderBottom: 1, marginLeft: 40, width: "50%" }}>
                                    { pagos[2] === true ?
                                        <Text style= {{ fontSize: 10,
                                            color: "#303f9f"}}>{"   Si"}</Text>
                                        :
                                        <Text style= {{ fontSize: 10,
                                            color: "#303f9f"}}>{"   No"}</Text>

                                    }
                                    </div>
                                </View>

                                <View style={styles.container}>
                                    <Text style={styles.text1}>Fecha y Hora en el ticket:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[3]}</Text>
                                    </div>
                                    <Text style={styles.text1}>Fecha y Hora de registro:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[4]}</Text>
                                    </div>
                                   
                                </View>


                                <View style={styles.container}>
                                    <Text style={styles.text1}> Inicio del curso:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[5]}</Text>
                                    </div>
                                    <Text style={styles.text1}> Termino del curso :</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[6]}</Text>
                                    </div>
                                   
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}> Cantidad:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "100%" }}>
                                        <Text style={styles.text2}>{" " + pagos[7]}</Text>
                                    </div>
                                   
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text1}> Falta descripcion:</Text>
                                    <div style={{ borderBottom: 1, marginLeft: 15, width: "30%" }}>
                                        <Text style={styles.text2}>{" " + pagos[7]}</Text>
                                    </div>
                                   
                                </View>


                            

                            </View >
                        </Page>
                    </Document>
                </PDFViewer>

            </div>

        )
    }

}



export default (props) => (
    <PDFPago
        {...props}
        params={useParams()}
    />
);