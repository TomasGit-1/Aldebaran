import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import NavbarMain from '../Components/NavbarS';


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
            opServicio:0,
            modalidad:""
        };
        this.onModalida = this.onModalida.bind(this);
        this.onServicio = this.onServicio.bind(this);
    }
    /*  
    ===========================================================================
                Esta funcion trae toodos los servicios educativos 
                    que esten en la base de datos
    ===========================================================================
    */
    componentDidMount() {
        this.apiServicios();
    }
    onModalida(event) {
        console.log(event.target.value);
        this.setState({ modalidad: event.target.value });
    }
    onServicio(event) {
        console.log(event.target.value);
        this.setState({ modalidad: event.target.value });
    }
    apiServicios = async () => {
        try {
            var id = [];
            var Servicios = [];
            var habilitado = [];
            const response = await fetch("http://localhost:5000/api/Servicios")
            var responseJson = await response.json();
            for (var i = 0; i < responseJson.id.length; i++) {
                if (responseJson.habilitado[i] === "true"){
                    id.push(responseJson.id[i]);
                    Servicios.push(responseJson.programaAcademico[i]);
                    habilitado.push(responseJson.habilitado[i]);
                }
            }
            this.setState({ id: id});
            this.setState({ servicio: Servicios});
        } catch (e) {
            console.log(e);
        }

    }
    render() {
        var { servicio } = this.state
        return (
            <main>
                <NavbarMain />
                <section>
                    <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                        <Form>
                            <Row>
                                <div className="alert alert-secondary mt-2" role="alert">
                                    Pagos
                                </div>
                            </Row>
                            <Row>
                                <Col sm className="mt-3">
                                    <Form.Group controlId="formFile">
                                        <Form.Label className="h5 ">Servicio educativo *</Form.Label>
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
                                    <Row>
                                        <Form.Label className="h5 mt-3 mb-4">Modalidad *</Form.Label>
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
                                <Col sm className="mt-3" >
                                    <Form.Group controlId="formFile" >
                                        <Form.Label className="h5">Ticket de pago *</Form.Label>
                                        <Form.Control type="file" accept=".pdf" onChange={this.uploadFileCurp} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Row>
                                <div className="alert alert-secondary mt-2" role="alert">
                                    Pagos
                                </div>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="h5">Referencia</Form.Label>
                                        <Form.Control type="text" placeholder="Referencia"  />
                                    </Form.Group>
                                </Col>
                                <Col sm>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="h5">Fecha / Hora </Form.Label>
                                        <Form.Control type="datetime-local"/>
                                    </Form.Group>
                                </Col>
                                <Col sm>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="h5">Cantidad $</Form.Label>
                                        <Form.Control type="Number" placeholder="Cantidad"  />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Button type="button" className=" mt- 3 mb-3 col-4" style={{ background: '#600101', color: '#FFFFFF' }}>
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>

                </section>
            </main>
        )
    }
}

export default Pagos