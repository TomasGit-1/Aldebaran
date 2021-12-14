import React from 'react'
import {Button , Form , Container ,Row ,Col ,Alert , Popover , Overlay } from 'react-bootstrap'

class Pagos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
            opciones: [
            ],
            opciones2: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ],
        }   
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
    apiServicios = async () => {
        try {
            var array = [];
            const response = await fetch("http://localhost:5000/ServEducativo")
            var responseJson = await response.json();
            for (var i = 0; i < responseJson["Servicios"].length; i++) {
                array.push(responseJson["Servicios"][i]);
            }
            this.setState({ opciones: array });
        } catch (e) {
            console.log(e);
        }
    
    }
    render() {
        var { opciones } = this.state
        return (
            <main>
                <section>
                    <Form>
                        <Row>
                            <div className="mt-2 " style={{ background: '#A90101', color: '#FFFFFF', height: "30px", borderRadius: "5px" }}>
                                <small className="mt-0">Servicio educativo</small>
                            </div>
                            <p>

                            </p>
                            <Col sm className="mt-3">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label className="h5 ">Servicio educativo *</Form.Label>
                                    <p> {this.state.msgServicio}</p>
                                    <Form.Select onChange={this.handlechange} name={this.state.n_max_estudios}>
                                        <option value="null">Seleccione una opcion</option>
                                        {
                                            opciones.map(function (item) {
                                                return <option value={item}>{item}</option>;
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Row>
                                    <Form.Label className="h5 mt-3 mb-5">Modalidad *</Form.Label>
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
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label className="h5">Archivo de curp *</Form.Label>
                                    <Form.Control type="file" accept=".pdf" onChange={this.uploadFileCurp} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </section>
            </main>
        )
    }
}

export default Pagos