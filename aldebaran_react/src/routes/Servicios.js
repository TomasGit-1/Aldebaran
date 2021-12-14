import React from 'react';
import NavbarMain from '../Components/NavbarS';
import { Table, Container, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios'


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
            servicioNew:""
        }
        this.SendDatos = this.SendDatos.bind(this);
        this.dataForm0 = this.dataForm0.bind(this);
    }
    dataForm0(event){
        console.log( event.target.value);
        this.setState({ servicioNew: event.target.value });
    }
    SendDatos() {
        let data={
            servicioNew: this.state.servicioNew,
        }
        axios.post('http://localhost:5000/InsertarServicio', {
            data,
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.apiServicios();
        }).catch(function (error) {
        });
    
    }
    componentDidMount() {
        this.apiServicios();
    }
    apiServicios = async () => {
        try {
            var id = [];
            var Servicios = [];
            var habilitado = [];
            const response = await fetch("http://localhost:5000/TablaEducativo")
            var responseJson = await response.json();
            // console.log(responseJson["Servicios"][0]{);
            // console.log(responseJson["Servicios"][0]);
            for (var i = 0; i < responseJson["Servicios"].length; i++) {
                id.push(responseJson["id"][i]);
                Servicios.push(responseJson["Servicios"][i]);
                habilitado.push(responseJson["habilitado"][i]);
            }
            console.log(responseJson['id']);
            console.log(responseJson['Servicios']);
            console.log(responseJson['habilitado']);
            this.setState({ id: id});
            this.setState({ servicio: Servicios});
            this.setState({ habilitado: habilitado});
        } catch (e) {
            console.log(e);
        }
    
    }
    render() {
        var { id } = this.state
        var { servicio } = this.state
        var { habilitado } = this.state
        return(
            <main>
                <NavbarMain />
                <section>
                    <Container className="mt-3 mb-3" >
                        <Row >
                            <Col sm >
                                <Form.Group >
                                    <Form.Control type="text" placeholder="servicio"  onChange={(evt) => this.dataForm0(evt)}
/>
                                </Form.Group>
                            </Col>
                            <Col sm >
                                <Form.Group >
                                    <Button variant="outline-primary" onClick={() => this.SendDatos()}>
                                        <i class="bi bi-plus-circle-fill "></i>
                                        &nbsp;&nbsp;Agregar
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section>
                    <Container>
                        <Table responsive>
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
                                        <td><Button>Actualizar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                </section>

            </main>
        )                            
    }
}
export default Servicios;