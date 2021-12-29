import React from 'react';
import NavbarMain from '../Components/NavbarS';
import { Table, Container, Col, Row, Form, Button, Dropdown , ButtonGroup } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'

class Servicios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
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
            servicioNew: "",
            show: false,
            showForm: false,
            showTable: true,
            resAcademico:"",
            tipoEvento:"",
            nombreServicio:"",
            modalidad:"",
            cuota : ""   
        }
        this.SendDatos = this.SendDatos.bind(this);
        this.dataForm0 = this.dataForm0.bind(this);
        this.editar = this.editar.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.onSeleccion = this.onSeleccion.bind(this);
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
    onSeleccion(event) {
        console.log(event.target.value);
        this.setState({ modalidad: event.target.value });
    }
    dataForm0(event , data) {
        if (data === "resgitroid"){
            this.setState({ resAcademico: event.target.value });
        }else if (data === "evento"){
            this.setState({ tipoEvento: event.target.value });
        }else if (data === "nombre"){
            this.setState({ nombreServicio: event.target.value });
        }else if (data ==="cuota"){
            this.setState({ cuota: event.target.value });
        }
    }

    SendDatos() {
        let validacion = {
            registro:  this.state.resAcademico,
            evento:    this.state.tipoEvento,
            nombre:    this.state.nombreServicio,
            cuota:     this.state.cuota,
            modalidad :this.state.modalidad
        }
        console.log(validacion);
        console.log(validacion.registro);
        console.log(validacion.evento);
        console.log(validacion.nombre);
        console.log(validacion.cuota);
        console.log(validacion.modalidad);
        if (validacion.registro === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo resgitro academico esta vacio',
            })
        }else if (validacion.evento === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El campo tipo de evento esta vacio',
            })
        }else if (validacion.nombre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'El camppo Nombre del programa academico esta vacio',
            })
        }else if (validacion.cuota === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Agregue el costo del servicio por persona',
            })
        }else if (validacion.modalidad=== "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Seleccione una opcion de modalidad',
            })
        }else {
            var msg = '¿Estas seguro de agregar\n - ' + validacion.registro+ '- como servicio?';
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
                    // let data = {
                    //     servicioNew: this.state.servicioNew,
                    // }
                    axios.post('http://localhost:5000/api/createServicio', {
                        validacion,
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
        console.log( validacion['habilitado'][b]);
        if(validacion['habilitado'][b] === "Habilitado"){
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
                axios.post('http://localhost:5000/api/updateHabilitado', {
                    data,
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.apiServicios();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Servicio modificado',
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
            
            let id =[]
            let registro = []
            let evento = []
            let programaAcademico =[]
            let habilitado =[]
            let modalidadArray =[]
            let cuotaArray =[]
            const response = await fetch("http://localhost:5000/api/Servicios")
            var responseJson = await response.json();
            console.log("Estamos obnteniedo los ")
            // console.log(responseJson.Servicios.length);
            // console.log(responseJson.habilitado);
            for (var i = 0; i < responseJson.id.length; i++) {
                id.push(responseJson.id[i]);
                registro.push(responseJson.registro[i]);
                evento.push(responseJson.evento[i]);
                programaAcademico.push(responseJson.programaAcademico[i]);
                if(responseJson.habilitado[i] === "true"){
                    console.log("Habilitado");
                    habilitado.push("Habilitado");
                }else{
                    console.log("Desabilidato");
                    habilitado.push("Desabilidato");
                }
                modalidadArray.push(responseJson.modalidad[i]);
                cuotaArray.push(responseJson.cuota[i]);
            }
            // console.log(responseJson['id']);
            // console.log(responseJson['Servicios']);
            // console.log(responseJson['habilitado']);
            this.setState({ id: id });
            this.setState({ registro: registro });
            this.setState({ evento: evento });
            this.setState({ programaAcademico: programaAcademico });
            this.setState({ habilitado: habilitado });
            this.setState({ modalidadArray: modalidadArray });
            this.setState({ cuotaArray: cuotaArray });
        } catch (e) {
            console.log(e);
        }

    }
    render() {
        let {id} = this.state
        let {registro} = this.state
        let {evento} = this.state
        let {programaAcademico} =this.state
        let {habilitado} =this.state
        let {modalidadArray} =this.state
        let {cuotaArray} =this.state
        let { showForm } = this.state
        let { showTable } = this.state

        return (
            <main>
                <NavbarMain />
               

                { showForm ? 
                    <section>
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                        <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Form.Group >
                                    <Form.Label className="h5">Registro academico</Form.Label>
                                        <Form.Control type="text" placeholder="Registro academico" onChange={(evt) => this.dataForm0(evt , "resgitroid")}/>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row >
                                <Col sm >
                                    <Form.Group >
                                    <Form.Label className="h5">Tipo de evento</Form.Label>
                                        <Form.Control type="text" placeholder="Evento" onChange={(evt) => this.dataForm0(evt ,"evento")}/>
                                    </Form.Group>
                                </Col>
                                <Col sm >
                                    <Form.Group >
                                    <Form.Label className="h5">NOMBRE DEL PROGRAMA ACADÉMICO</Form.Label>
                                        <Form.Control type="text" placeholder="servicio" onChange={(evt) => this.dataForm0(evt , "nombre")}/>
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
                                    <Form.Label className="h5">CUOTA POR PARTICIPANTE</Form.Label>
                                        <Form.Control type="text" placeholder="CUOTA POR PARTICIPANTE" onChange={(evt) => this.dataForm0(evt, "cuota")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                          
                            <Row className="mt-3 mb-3">
                                <Col sm >
                                    <Form.Group >
                                        <Button variant="outline-primary" onClick={() => this.SendDatos()}>
                                            <i className="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Agregar
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="outline-danger" onClick={() => this.ShowForm(0)}>
                                            <i className="bi bi-plus-circle-fill "></i>
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
                        <section>
                            <Container className="mt-3 mb-3"> 
                            </Container>
                        </section>
                        <Container className="border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                            <ButtonGroup aria-label="Basic example" className="mt-3 mb-3"> 
                                <Button variant="secondary" onClick={() => this.ShowForm(1)}>  
                                    Nuevo servicio &nbsp;&nbsp;<i className="bi bi-plus-circle-fill "></i>
                                </Button>
                            </ButtonGroup>
                            {
                                id.length === 0 ?
                                    <Container className="mb-3"  >
                                        <div className="alert alert-danger mt-2" role="alert">
                                            No hay servicios en la base de datos
                                        </div>
                                    </Container>
                                : null
                            }
                            <div className="table-responsive " style={{ height: "500px" }}>
                                <Table  className="table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Registro academico</th>
                                            <th>Tipo de evento</th>
                                            <th>Nombre</th>
                                            <th>Modalidad</th>
                                            <th>Cuota</th>
                                            <th>Estatus</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {id.map((_, index) => (

                                            <tr key={index}>
                                                <td >{index}</td>
                                                <td>{registro[index]}</td>
                                                <td>{evento[index]}</td>
                                                <td >{programaAcademico[index]}</td>
                                                <td>{modalidadArray[index]}</td>
                                                <td>{cuotaArray[index]}</td>
                                                <td>{habilitado[index]}</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item ><Button onClick={() => this.editar(index)}>Editar</Button></Dropdown.Item>
                                                            
                                                            <Dropdown.Item onClick={() => this.editar(index)}>
                                                                
                                                                    {
                                                                        habilitado[index]==="Habilitado" ?
                                                                            <small>desabilitar</small>
                                                                        :  <p>Habilitar</p>
                                                                    }

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