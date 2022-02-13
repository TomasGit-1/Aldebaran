import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom'
import config from '../config/config.json';
import axios from 'axios'
import imgTitulo from "../static/titulo.png";
import logo from "../static/LogoBN.jpg";
import Swal from 'sweetalert2'


class PDFServicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Primera aplicacion React",
            servicio: []
        }
    }
    componentDidMount() {
        var parametros = this.props.params;
        this.getDataServicios(parametros.value);
    }
    getDataServicios = async (idServicio) => {
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/DataServicioPDF";
        var bodyFormData = new FormData();
        bodyFormData.append('idServicio', idServicio);
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

        let arrayServicios = [];
        arrayServicios.push(respuesta[0].idserviciosedu);
        arrayServicios.push(respuesta[0].registro_academico);
        arrayServicios.push(respuesta[0].tipo_evento);
        arrayServicios.push(respuesta[0].programa_academico);
        arrayServicios.push(respuesta[0].modalidad);
        arrayServicios.push(respuesta[0].cuota);
        arrayServicios.push(respuesta[0].habilitado);
        arrayServicios.push(respuesta[0].nummodulo);
        arrayServicios.push(respuesta[0].numhoras);
        this.setState({ servicio: arrayServicios });

    }
    render() {
        let { servicio } = this.state

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
                marginBottom: 15
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

                                { servicio[6] === true ?
                                    <Text style={styles.text1}>{"Servicio : Habilitado"}</Text>
                                    :
                                    <Text style={styles.text1}>{"Servicio : deshabilitado"}</Text>

                                }
                                 <Text >{" \n "}  </Text>

                                <View style={styles.container}>
                                        <Text style={styles.text1}>Registro academico:</Text>
                                        <div style={{borderBottom : 1,marginLeft:10,width:"60%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[1]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Numero de modulos:</Text>
                                        <div style={{borderBottom : 1,marginLeft:10,width:"10%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[7]}</Text>

                                        </div>   
                                </View> 
                                <View style={styles.container}>
                                        <Text style={styles.text1}>Numero de horas:</Text>
                                        <div style={{borderBottom : 1,marginLeft:23,width:"10%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[8]}</Text>
                                        </div>  
                                        <Text style={styles.text1}>Tipo de evento:</Text>
                                        <div style={{borderBottom : 1,marginLeft:15,width:"80%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[2]}</Text>
                                        </div>   
                                </View> 
                                <View style={styles.container}>
                                        <Text style={styles.text1}>Modalidad:</Text>
                                        <div style={{borderBottom : 1,marginLeft:30,width:"40%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[4]}</Text>
                                        </div>  
                                        {/* <div style={{borderBottom : 1,marginLeft:23,width:"60%"}}>
                                            { servicio[6] === true ?
                                                <Text style={styles.text2}>{"Habilitado"}</Text>
                                                :
                                                <Text style={styles.text2}>{"Deshabilitado"}</Text>

                                            }
                                        </div>   */}
                                        <Text style={styles.text1}>Cuota por participante:</Text>
                                        <div style={{borderBottom : 1,marginLeft:45,width:"80%"}}>
                                            <Text style={styles.text2}>{ " "+servicio[5]}</Text>
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
    <PDFServicio
        {...props}
        params={useParams()}
    />
);