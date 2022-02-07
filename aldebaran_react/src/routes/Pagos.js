import React from 'react'
import { Button, Form, Container, Row, Col, ButtonGroup, Table, Dropdown, CloseButton, OverlayTrigger, Tooltip , InputGroup} from 'react-bootstrap'
import NavbarMain from '../Components/NavbarS';
import Swal from 'sweetalert2'
import $ from 'jquery';
import config from '../config/config.json';
import Moment from 'moment'
import { StyleSheet } from '@react-pdf/renderer';


class Pagos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
            opciones: [
            ],
            id: [
            ],
            servicio: [
            ],
            opServicio: 0,
            modalidad: "",
            showForm: false,
            showTable: true,
            dataPagos: []
        };
        this.onModalida = this.onModalida.bind(this);
        this.onServicio = this.onServicio.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.filterInput = this.filterInput.bind(this);


    }
    /*  
    ===========================================================================
                Esta funcion trae toodos los servicios educativos 
                    que esten en la base de datos
    ===========================================================================
    */
    componentDidMount() {
        this.apiGetPagos();
        this.serviciosHabilitados();

    }
    onModalida(event) {
        this.setState({ modalidad: event.target.value });
    }
    onServicio(event) {
        this.setState({ modalidad: event.target.value });
    }
    ShowForm(num) {
        if (num === 1) {
            this.setState({
                showForm: true,
                showTable: false,
            });
        } else if (num === 0) {
            this.setState({
                showForm: false,
                showTable: true,
            });
        }
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
    apiGetPagos = async () => {
        try {
            const response = await fetch(config.general[0].url + config.general[0].puerto_api + "/api/Pagos");
            var responseJson = await response.json();
            var temp = responseJson;
            if (temp['status'] == 200) {
                responseJson = responseJson['data'];
                let arrayInfo = [];
                console.log(responseJson.length);
                for (let i = 0; i < responseJson.length; i++) {
                    let arrayTemp = [];
                    arrayTemp.push(responseJson[i].idpagos);
                    arrayTemp.push(responseJson[i].idcurpfk);
                    arrayTemp.push(responseJson[i].referencia);
                    arrayTemp.push(responseJson[i].registro_academico);
                    arrayTemp.push(responseJson[i].programa_academico);
                    arrayTemp.push(responseJson[i].cuota);

                    var fechahoraticket = new Moment(responseJson[i].fechahoraticket).format('DD/MM/YYYY');
                    arrayTemp.push(fechahoraticket);
                    var fechahoraregistro = new Moment(responseJson[i].fechahoraregistro).format('DD/MM/YYYY');
                    arrayTemp.push(fechahoraregistro);


                    arrayTemp.push(responseJson[i].nummodulo);
                    arrayTemp.push(responseJson[i].idserviciosedufk);
                    arrayTemp.push(responseJson[i].comprobantepath);
                    arrayTemp.push(responseJson[i].modalidad);
                    arrayTemp.push(responseJson[i].fecha_inicio);
                    arrayTemp.push(responseJson[i].fecha_tÉrmin);
                    arrayTemp.push(responseJson[i].idserviciosedu);
                    arrayTemp.push(responseJson[i].tipo_evento);
                    arrayTemp.push(responseJson[i].numhoras);
                    arrayTemp.push(responseJson[i].habilitado);

                    arrayInfo.push(arrayTemp);
                }
                console.log(arrayInfo);
                this.setState({ dataPagos: arrayInfo });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: temp['data'],
                })
            }
        } catch (e) {

        }
    }
    serviciosHabilitados = async () => {
        try {
            var id = [];
            var Servicios = [];
            var habilitado = [];
            const response = await fetch(config.general[0].url + config.general[0].puerto_api + "/api/Servicios")
            var responseJson = await response.json();
            var temp = responseJson;
            if (temp['status'] == 200) {
                responseJson = responseJson['data']
                for (var i = 0; i < responseJson.id.length; i++) {
                    if (responseJson.habilitado[i] === "true") {
                        id.push(responseJson.id[i]);
                        Servicios.push(responseJson.programaAcademico[i]);
                        habilitado.push(responseJson.habilitado[i]);
                    }
                }
                this.setState({ id: id });
                this.setState({ servicio: Servicios });
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
        var { servicio } = this.state
        let { showTable } = this.state
        let { showForm } = this.state
        let { dataPagos } = this.state
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
                            <Form>
                                
                                <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                    Comprobante de pago
                                </div>
                                <Row className="mt-3">
                                    <Col sm >
                                        <Form.Group controlId="formFile">
                                            <Form.Label className="h6 ">Servicio educativo  <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                            <p> {this.state.msgServicio}</p>
                                            <Form.Select onChange={this.onServicio}>
                                                <option value="null">Seleccione una opcion</option>
                                                {
                                                    servicio.map(function (item) {
                                                        return <option key={item} value={item}>{item}</option>;
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm >
                                        <Form.Group controlId="formFile">
                                            <Form.Label className="h6 ">Numero de modulo  <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                            <p> {this.state.msgServicio}</p>
                                            <Form.Select onChange={this.onServicio}>
                                                <option value="null">Seleccione una opcion</option>
                                                {
                                                    servicio.map(function (item) {
                                                        return <option key={item} value={item}>{item}</option>;
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col sm >
                                        <Form.Group controlId="formFile" >
                                            <Form.Label className="h6 mb-4" >Ticket de pago  <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                            <Form.Control type="file" accept=".pdf" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col sm>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Referencia  <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                            <Form.Control type="text" placeholder="Referencia" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group className="mb-3" >
                                            <Form.Label className="h5">Fecha / Hora </Form.Label>
                                            <Form.Control type="datetime-local" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        
                                            <Form.Group >
                                                <Form.Label className="h5">Cantidad</Form.Label>
                                            </Form.Group>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                                <Form.Control type="text" placeholder="Cantidad"  />
                                            </InputGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3 ">
                                    <Col sm>
                                        {/* <Button className="col-6" variant="outline-primary" onClick={() => this.SendDatos()}>
                                            <i className="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Agregar
                                        </Button>&nbsp;&nbsp; */}
                                          <Button className="col-6"
                                               variant="success"  >
                                                <i className="bi bi-plus-circle-fill "></i>
                                                &nbsp;&nbsp;
                                                Enviar
                                            </Button>
                                    </Col>
                                    {/* <Col sm >
                                        <Button className="col-12" variant="outline-danger" onClick={() => this.ShowForm(0)}>
                                            <i className="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Cancelar
                                        </Button>
                                    </Col> */}
                                </Row>
                            </Form>
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
                            <h3>Pagos</h3>

                            <Row className="mt-3 mb-3">
                                <Col >
                                    <ButtonGroup aria-label="Basic example" >
                                        <Button variant="secondary" onClick={() => this.ShowForm(1)}>
                                            Nuevo Pago &nbsp;&nbsp;<i className="bi bi-plus-circle-fill "></i>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                                <Col >
                                    <input className='form-control' type="text" placeholder='Buscar' id="myInput" onChange={this.filterInput}></input>
                                </Col>
                            </Row>


                            <div className="table-responsive " style={{ height: "500px" }}>
                                <Table className="table-hover" id="myTable" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Curp</th>
                                            <th>Referencia</th>
                                            <th>Registro Academico</th>
                                            <th>Nombre</th>
                                            <th>Cuota</th>
                                            <th>Fecha en ticket</th>
                                            <th>Fecha de registro</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataPagos.map((index) =>
                                                <tr key={index}>
                                                    <td >{index[0]}</td>
                                                    <td >{index[1]}</td>
                                                    <td >{index[2]}</td>
                                                    <td >{index[3]}</td>
                                                    <td >{index[4]}</td>
                                                    <td >{index[5]}</td>
                                                    <td >{index[6]}</td>
                                                    <td >{index[7]}</td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item >
                                                                    <i className="bi bi-pencil"></i> &nbsp;&nbsp;Editar
                                                                </Dropdown.Item>
                                                                <Dropdown.Divider />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="bi bi-cloud-download"></i>&nbsp;&nbsp;Download
                                                                <Dropdown.Divider />
                                                                <Dropdown.Item  >
                                                                    <i className="bi bi-images"></i>&nbsp;&nbsp;Fotografia
                                                                </Dropdown.Item>

                                                                <Dropdown.Item>
                                                                    <i className="bi bi-file-earmark-pdf"></i>&nbsp;&nbsp;Curp
                                                                </Dropdown.Item>


                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>

                                                </tr>
                                            )
                                        }

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

export default Pagos