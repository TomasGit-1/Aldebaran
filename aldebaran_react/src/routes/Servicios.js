import React from 'react';
import NavbarMain from '../Components/NavbarS';
import { Table, Container, Col, Row, Form, Button, Dropdown , ButtonGroup } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import SweetAlert from 'sweetalert2-react';

// import ServicoEducativo from "./FormServicioEducativo";

class Servicios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
            id: [
            ],
            servicio: [
            ],
            habilitado: [
            ],
            servicioNew: "",
            show: false,
            showForm: false,
            showTable: true,
        }
        this.SendDatos = this.SendDatos.bind(this);
        this.dataForm0 = this.dataForm0.bind(this);
        this.editar = this.editar.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
    }
    ShowForm (num) {
        if (num === 1) {
            this.setState({
                showForm: true,
                showTable: false,
            });
        }else if  (num === 0) {
            this.setState({
                showForm: false,
                showTable: true,
            });
        }
    }
    dataForm0(event) {
        console.log(event.target.value);
        this.setState({ servicioNew: event.target.value });
    }
    SendDatos() {
        let validacion = {
            campo: this.state.servicioNew
        }
        console.log(validacion['campo']);
        if (validacion['campo'] === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo servicio no tiene ningun datos',
            })
        } else {
            var msg = '¿Estas seguro de agregar\n - ' + validacion['campo'] + '- como servicio?';
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
                    let data = {
                        servicioNew: this.state.servicioNew,
                    }
                    axios.post('http://localhost:5000/createServicio', {
                        data,
                    })
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
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
                            });
                        }).catch(function (error) {
                        });

                }
            })
        }
    }
    editar(b) {
        console.log(b);
        let validacion = {
            id: this.state.id,
            servicio: this.state.servicio,
            habilitado: this.state.habilitado,
        }
        var msg = "";
        var opcion= false;
        console.log(typeof validacion['habilitado'][b]);
        if(validacion['habilitado'][b] === "true"){
            msg ="¿Desahabilitar el servicio?";
            opcion = false;
        }else{
            msg ="¿Habilitar el servicio?";
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
                    "id":validacion['id'][b],
                    "habilitado":opcion
                }
                axios.post('http://localhost:5000/HaDesa_bilitar', {
                    data,
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.apiServicios();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Servicio agregado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).catch(function (error) {
                });
                
            }
        })

    }
    componentDidMount() {
        this.apiServicios();
    }
    apiServicios = async () => {
        try {
            var id = [];
            var Servicios = [];
            var habilitado = [];
            const response = await fetch("http://localhost:5000/Servicios")
            var responseJson = await response.json();
            // console.log(responseJson["Servicios"][0]{);
            // console.log(responseJson["Servicios"][0]);
            for (var i = 0; i < responseJson["Servicios"].length; i++) {
                id.push(responseJson["id"][i]);
                Servicios.push(responseJson["Servicios"][i]);
                habilitado.push(responseJson["habilitado"][i]);
            }
            // console.log(responseJson['id']);
            // console.log(responseJson['Servicios']);
            // console.log(responseJson['habilitado']);
            this.setState({ id: id });
            this.setState({ servicio: Servicios });
            this.setState({ habilitado: habilitado });
        } catch (e) {
            console.log(e);
        }

    }
    render() {
        var { id } = this.state
        var { servicio } = this.state
        var { habilitado } = this.state
        let { showForm } = this.state
        let { showTable } = this.state


        return (
            <main>
                <NavbarMain />
                <section>
                    <Container className="mt-3 mb-3"> 
                        <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => this.ShowForm(1)}>  
                            Nuevo servicio &nbsp;&nbsp;<i class="bi bi-plus-circle-fill "></i>
                        </Button>
                        </ButtonGroup>
                    </Container>
                </section>

                { showForm ? 
                    <section>
                        <Container className="mt-3 mb-3" >
                            <Row >
                                <Col sm >
                                    <Form.Group >
                                        <Form.Control type="text" placeholder="servicio" onChange={(evt) => this.dataForm0(evt)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                        <Button variant="outline-primary" onClick={() => this.SendDatos()}>
                                            <i class="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Agregar
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => this.ShowForm(0)}>
                                            <i class="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Cancelar
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                 : null 
                }

                { showTable ? 

                    <section>
                        <Container>
                            {
                                servicio.length === 0 ?
                                    <Container className="mt-3 mb-3"  >
                                        <div class="alert alert-danger mt-2" role="alert">
                                            No hay servicios en la base de datos
                                        </div>
                                    </Container>
                                : null
                            }
                            <div class="table-responsive " style={{ height: "500px" }}>
                                <Table  className="table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Servicio</th>
                                            <th>Estatus</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {id.map((_, index) => (

                                            <tr>
                                                <td>{index}</td>
                                                <td>{servicio[index]}</td>
                                                <td>{habilitado[index]}</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <i class="bi bi-three-dots-vertical"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item ><Button onClick={() => this.editar(index)}>Editar</Button></Dropdown.Item>
                                                            
                                                            <Dropdown.Item onClick={() => this.editar(index)}>
                                                                
                                                                    {
                                                                        habilitado[index]==="true" ?
                                                                            <small>desabilitar</small>
                                                                        :  <p>Habilitar</p>
                                                                    }

                                                            </Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                                <td><Button onClick={() => this.editar(index)}><i class="bi bi-pen-fill"></i></Button></td>
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