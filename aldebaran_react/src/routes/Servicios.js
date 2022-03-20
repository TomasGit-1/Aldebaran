import React from 'react';
import NavbarMain from '../Components/NavbarS';
import { Table, Container, Col, Row, Form, Button, Dropdown, ButtonGroup, InputGroup, CloseButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import $ from 'jquery';
import config from '../config/config.json';
import { StyleSheet } from '@react-pdf/renderer';
import { Link } from "react-router-dom";

class Servicios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
            url: "",
            id: [
            ],
            registro: [
            ],
            habilitado: [
            ],
            evento: [
            ],
            programaAcademico: [
            ],
            modalidadArray: [
            ],
            cuotaArray: [
            ],
            moduloArray: [
            ],
            HorasArray: [
            ],
            servicioNew: "",
            show: false,
            showForm: false,
            showTable: true,
            showisUpdate: false,

            idServicio:-1,
            resAcademico: "",
            tipoEvento: "",
            nombreServicio: "",
            modalidad: "",
            cuota: "",
            numModulo: 1,
            numHoras: 1,

        }
        this.SendDatos = this.SendDatos.bind(this);
        this.dataForm0 = this.dataForm0.bind(this);
        this.editar = this.editar.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.onSeleccion = this.onSeleccion.bind(this);
        this.filterInput = this.filterInput.bind(this);
        this.getUpdateServicios = this.getUpdateServicios.bind(this);
    }
    filterInput() {
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                })
            })
        })
    }
    ShowForm(num, isActualizar) {
        if (isActualizar) {
            this.setState({
                showForm: false,
                showTable: false,
                showisUpdate: true,
            });
            this.getUpdateServicios(num);
        } else {
            
            if (num === 1) {
                this.setState({
                    showForm: true,
                    showTable: false,
                    showisUpdate: false
                });
            } else if (num === 0) {
                this.setState({
                    showForm: false,
                    showTable: true,
                    showisUpdate: false
                });
            }


        }
    }
    onSeleccion(event) {
        this.setState({ modalidad: event.target.value });
    }
    dataForm0(event, data) {
        if (data === "resgitroid") {
            this.setState({ resAcademico: event.target.value });
        } else if (data === "evento") {
            this.setState({ tipoEvento: event.target.value });
        } else if (data === "nombre") {
            this.setState({ nombreServicio: event.target.value });
        } else if (data === "cuota") {
            this.setState({ cuota: event.target.value });
        } else if (data === "numModulo") {
            this.setState({ numModulo: event.target.value });
        } else if (data === "numHoras") {
            this.setState({ numHoras: event.target.value });
        }
    }

    SendDatos( isUpdate ) {
        let validacion = {
            idServicio: this.state.idServicio,
            registro: this.state.resAcademico,
            evento: this.state.tipoEvento,
            nombre: this.state.nombreServicio,
            cuota: this.state.cuota,
            modalidad: this.state.modalidad,
            numModulo: this.state.numModulo,
            numHoras: this.state.numHoras
        }

        if (validacion.registro === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo registro académico esta vacio',
            })
        } else if (validacion.evento === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo tipo de evento esta vacio',
            })
        } else if (validacion.nombre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo Nombre del programa académico esta vacio',
            })
        } else if (validacion.cuota === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Agregue el costo del servicio por persona',
            })
        } else if (validacion.modalidad === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Seleccione una opcion de modalidad',
            })
        } else {
            if(isUpdate){
                //Actualizamos los datos
                var msg = '¿Actualizar el servicio ?';
                Swal.fire({
                    title: msg,
                    text: "Actualizar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.post(config.general[0].url + config.general[0].puerto_api + '/api/UpdateServicios', {
                            validacion,
                        })
                            .then(res => {
                               // this.apiServicios();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: res["data"]["mensaje"],
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.setState({
                                    showForm: false,
                                    showTable: true,
                                    showisUpdate: false,
                                });

                              
                                setTimeout(window.location.reload(false), 7000);
                            }).catch(function (e) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops..',
                                    text: e,
                                })
                            });
    
                    }
                }) 
            }else{
                //Insertamos datos
                var msg = '¿Agregar\n - ' + validacion.registro + '- como servicio?';
                Swal.fire({
                    title: msg,
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(config.general[0].url + config.general[0].puerto_api + '/api/createServicio', {
                            validacion,
                        })
                            .then(res => {
                                this.apiServicios();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Servicio agregado',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                               
                                this.setState({
                                    showForm: false,
                                    showTable: true,
                                    showisUpdate: false,
                                });

                              
                                setTimeout(window.location.reload(false), 7000);
                            }).catch(function (e) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops..',
                                    text: e,
                                })
                            });
    
                    }
                })
            }
        }
    }
    editar(b) {
        let validacion = {
            id: this.state.id,
            servicio: this.state.servicio,
            habilitado: this.state.habilitado,
        }
        var msg = "";
        var opcion = false;
        if (validacion['habilitado'][b] === "Habilitado") {
            msg = "¿Desahabilitar el servicio?";
            opcion = false;
        } else {
            msg = "¿Habilitar el servicio?";
            opcion = true;
        }
        Swal.fire({
            title: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    "id": validacion['id'][b],
                    "habilitado": opcion
                }
                axios.post(config.general[0].url + config.general[0].puerto_api + '/api/updateHabilitado', {
                    data,
                })
                    .then(res => {

                        this.apiServicios();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Servicio modificado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }).catch(function (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops..',
                            text: e,
                        })

                    });

            }
        })

    }
    componentDidMount() {
        this.apiServicios();
    }
    getUpdateServicios = async (idServicio) => {
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/getUpdateServicios";
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

        this.setState({ idServicio: respuesta[0].idserviciosedu });
        this.setState({ resAcademico: respuesta[0].registro_academico });
        this.setState({ tipoEvento: respuesta[0].tipo_evento });
        this.setState({ nombreServicio: respuesta[0].programa_academico });
        this.setState({ modalidad: respuesta[0].modalidad });
        this.setState({ cuota: respuesta[0].cuota });
        this.setState({ numModulo: respuesta[0].nummodulo });
        this.setState({ numHoras: respuesta[0].numhoras });

    }
    apiServicios = async () => {
        try {
            console.log("Aqui estamos");
            let id = []
            let registro = []
            let evento = []
            let programaAcademico = []
            let habilitado = []
            let modalidadArray = []
            let cuotaArray = []
            let moduloArray = []
            let HorasArray = []
            const response = await fetch(config.general[0].url + config.general[0].puerto_api + "/api/Servicios")
            var responseJson = await response.json();
            var temp = responseJson;
            console.log(responseJson);
            if (temp['status'] === 200) {
                responseJson = responseJson['data'];
                for (var i = 0; i < responseJson.id.length; i++) {
                    id.push(responseJson.id[i]);
                    registro.push(responseJson.registro[i]);
                    evento.push(responseJson.evento[i]);
                    programaAcademico.push(responseJson.programaAcademico[i]);
                    if (responseJson.habilitado[i] === "true") {
                        habilitado.push("Habilitado");
                    } else {
                        habilitado.push("Deshabilidato");
                    }
                    modalidadArray.push(responseJson.modalidad[i]);
                    cuotaArray.push(responseJson.cuota[i]);
                    moduloArray.push(responseJson.numModulo[i]);
                    HorasArray.push(responseJson.numHoras[i]);
                }
                this.setState({ id: id });
                this.setState({ registro: registro });
                this.setState({ evento: evento });
                this.setState({ programaAcademico: programaAcademico });
                this.setState({ habilitado: habilitado });
                this.setState({ modalidadArray: modalidadArray });
                this.setState({ cuotaArray: cuotaArray });
                this.setState({ moduloArray: moduloArray });
                this.setState({ HorasArray: HorasArray });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: temp['data'],
                })
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: e,
            })
        }

    }
    render() {
        let { id } = this.state
        let { registro } = this.state
        let { evento } = this.state
        let { programaAcademico } = this.state
        let { habilitado } = this.state
        let { modalidadArray } = this.state
        let { cuotaArray } = this.state
        let { moduloArray } = this.state
        let { HorasArray } = this.state
        let { showForm } = this.state
        let { showTable } = this.state
        let { showisUpdate } = this.state
        let { modalidad } = this.state
        const styles = StyleSheet.create({

            buttonSend: {
                backgroundColor: "#00a01b ",
                color: " #000",
                border: "none",
                height: 45
            },
            buttonClose: {
                // backgroundColor:"#600101 ",
                color: "red",
                border: "none",
                height: 45
            }


        })
        return (
            <main>
                <NavbarMain />

                {showForm ?
                    <section style={{ marginTop: 80 }} >
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
                            >
                                <CloseButton style={styles.buttonClose} onClick={() => window.location.reload(false)} />
                                {/* <Button variant="success">Hover me to see</Button> */}
                            </OverlayTrigger>
                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                Servicios educativos
                            </div>
                            <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Registro académico</Form.Label>
                                        <Form.Control type="text" placeholder="Registro académico" onChange={(evt) => this.dataForm0(evt, "resgitroid")} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Número de Modulos (1, 2, 3...)</Form.Label>
                                        <Form.Control type="number" placeholder="Número de modulos" onChange={(evt) => this.dataForm0(evt, "numModulo")} min={1} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Número de horas </Form.Label>
                                        <Form.Control type="number" placeholder="Número de horas" onChange={(evt) => this.dataForm0(evt, "numHoras")} min={1} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row >
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Tipo de evento</Form.Label>
                                        <Form.Control type="text" placeholder="Evento" onChange={(evt) => this.dataForm0(evt, "evento")} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Nombre del programa académico</Form.Label>
                                        <Form.Control type="text" placeholder="Programa académico" onChange={(evt) => this.dataForm0(evt, "nombre")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Row>
                                        <Form.Label className="h5">Modalidad *</Form.Label>
                                    </Row>
                                    <Form.Check
                                        inline
                                        label="Virtual"
                                        name="modalidad"
                                        type="radio"
                                        value="Virtual"
                                        onChange={this.onSeleccion}
                                    />
                                    <Form.Check
                                        inline
                                        label="Presencial"
                                        name="modalidad"
                                        type="radio"
                                        value="Presencial"
                                        onChange={this.onSeleccion}
                                    />
                                </Col>

                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Cuota por participante</Form.Label>
                                    </Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Cuota por participante" onChange={(evt) => this.dataForm0(evt, "cuota")} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3 ">
                                <Col>
                                    <Button className="col-6"
                                        variant="secondary" onClick={() => this.SendDatos(false)}>
                                        <i className="bi bi-plus-circle-fill "></i>
                                        &nbsp;&nbsp;
                                        Enviar
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    : null
                }
                {showisUpdate ?
                    <section style={{ marginTop: 80 }} >
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
                            >
                                <CloseButton style={styles.buttonClose} onClick={() => window.location.reload(false)} />
                                {/* <Button variant="success">Hover me to see</Button> */}
                            </OverlayTrigger>
                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                Servicios educativos
                            </div>
                            <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Registro académico</Form.Label>
                                        <Form.Control type="text" placeholder="Registro académico" value={this.state.resAcademico} onChange={(evt) => this.dataForm0(evt, "resgitroid")} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Número de Modulos (1, 2, 3...)</Form.Label>
                                        <Form.Control type="number" placeholder="Número de modulos" value={this.state.numModulo} onChange={(evt) => this.dataForm0(evt, "numModulo")} min={1} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Número de horas </Form.Label>
                                        <Form.Control type="number" placeholder="Número de horas" value={this.state.numHoras} onChange={(evt) => this.dataForm0(evt, "numHoras")} min={1} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row >
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Tipo de evento</Form.Label>
                                        <Form.Control type="text" placeholder="Evento" value={this.state.tipoEvento} onChange={(evt) => this.dataForm0(evt, "evento")} />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Nombre del programa académico</Form.Label>
                                        <Form.Control type="text" placeholder="Programa académico" value={this.state.nombreServicio} onChange={(evt) => this.dataForm0(evt, "nombre")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Row>
                                        <Form.Label className="h5">Modalidad *</Form.Label>
                                    </Row>
                                    {modalidad === "Virtual" ?
                                        <div>

                                            <Form.Check
                                                inline
                                                label="Virtual"
                                                name="modalidad"
                                                type="radio"
                                                value="Virtual"
                                                defaultChecked
                                                onClick={this.onSeleccion}

                                            />
                                            <Form.Check
                                                inline
                                                label="Presencial"
                                                name="modalidad"
                                                type="radio"
                                                value="Presencial"
                                                onClick={this.onSeleccion}
                                            />

                                        </div>
                                        :
                                        <div>

                                            <Form.Check
                                                inline
                                                label="Virtual"
                                                name="modalidad"
                                                type="radio"
                                                value="Virtual"
                                                onClick={this.onSeleccion}

                                            />
                                            <Form.Check
                                                inline
                                                label="Presencial"
                                                name="modalidad"
                                                type="radio"
                                                value="Presencial"
                                                onClick={this.onSeleccion}
                                                defaultChecked
                                            />

                                        </div>
                                    }
                                </Col>

                                <Col sm >
                                    <Form.Group >
                                        <Form.Label className="h5">Cuota por participante</Form.Label>
                                    </Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Cuota por participante" value={this.state.cuota} onChange={(evt) => this.dataForm0(evt, "cuota")} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3 ">
                                <Col>

                                    <Button className="col-6"
                                        variant="secondary" onClick={() => this.SendDatos(true)}>
                                        <i className="bi bi-plus-circle-fill "></i>
                                        &nbsp;&nbsp;
                                        Actualizar
                                    </Button>

                                </Col>

                            </Row>
                        </Container>
                    </section>
                    : null
                }

                {showTable ?

                    <section style={{ marginTop: 80 }} >
                        <section>
                            <Container className="mt-3 mb-3">
                            </Container>
                        </section>
                        <Container className="border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                            <h3>Servicios educativos</h3>

                            <Row className="mt-3 mb-3">
                                <Col >
                                    <ButtonGroup aria-label="Basic example" >
                                        <Button variant="secondary" onClick={() => this.ShowForm(1 , false)}>
                                            Nuevo servicio &nbsp;&nbsp;<i className="bi bi-plus-circle-fill "></i>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                                <Col >
                                    <input className='form-control' type="text" placeholder='Buscar' id="myInput" onChange={this.filterInput}></input>
                                </Col>
                            </Row>

                            {
                                id.length === 0 ?
                                    <Container className="mb-3"  >
                                        <div className="alert alert-danger mt-2" role="alert">
                                            {/* No hay servicios en la base de datos */}
                                            No hay servicios de pagos

                                        </div>
                                    </Container>
                                    : null
                            }
                            <div className="table-responsive " style={{ height: "500px" }}>
                                <Table className="table-hover" id="myTable" striped bordered hover >
                                    <thead  >
                                        <tr>
                                            <th>#</th>
                                            <th>Registro académico</th>
                                            <th>Tipo de evento</th>
                                            <th>Nombre</th>
                                            <th>Modalidad</th>
                                            <th>Cuota</th>
                                            <th>Estatus</th>
                                            <th>Número de modulos</th>
                                            <th>Número de horas</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {id.map((_, index) => (
                                            <tr key={index}>
                                                <td >{id[index]}</td>
                                                <td>{registro[index]}</td>
                                                <td>{evento[index]}</td>
                                                <td >{programaAcademico[index]}</td>
                                                <td>{modalidadArray[index]}</td>
                                                <td>{cuotaArray[index]}</td>
                                                <td>{habilitado[index]}</td>
                                                <td>{moduloArray[index]}</td>
                                                <td>{HorasArray[index]}</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic" variant="secondary" >
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu variant="dark">
                                                            <Dropdown.Item onClick={() => this.ShowForm(id[index], true)} >
                                                                {/* <Button onClick={() => this.editar(index)}><i className="bi bi-pencil"></i></Button> */}
                                                                <i className="bi bi-pencil"></i> &nbsp;&nbsp;Editar
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.editar(index)}>

                                                                {
                                                                    habilitado[index] === "Habilitado" ?
                                                                        <label><i className="bi bi-toggle-off"></i>&nbsp;&nbsp;Deshabilitar</label>
                                                                        : <label><i className="bi bi-toggle-on"></i>&nbsp;&nbsp;Habilitar</label>
                                                                }

                                                            </Dropdown.Item>
                                                            <Dropdown.Item as={Link} to={`/PDFservicio/${id[index]}`} target="_blank" >
                                                                <i className="bi bi-cloud-download"></i>&nbsp;&nbsp; Generar pdf
                                                            </Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                                {/* <td><Button onClick={() => this.editar(index)}><i class="bi bi-pen-fill"></i></Button></td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Container>
                    </section>
                    : null
                }
            </main>
        )
    }
}
export default Servicios;