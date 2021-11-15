import React from 'react'
import {Button , Form , Container ,Row ,Col ,Alert} from 'react-bootstrap'
// import Select from 'react-select'




class Formulario0 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
            inputValue:"Bienvenido",
            options : [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ]
        }   
    }
    render() {
        return (
            <Container fluid>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"   value={this.state.inputValue}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group className="mb-3">
                                <Form.Label>Genero</Form.Label>
                                {/* <Select   options={this.state.options}  /> */}
                            </Form.Group>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="Number" placeholder="Edad" />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group className="mb-3">
                                <Form.Label>Curp</Form.Label>
                                <Form.Control type="text" placeholder="Curp" />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono particular</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono particular" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row  xs="auto">
                        <Col  xs={6} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono celular</Form.Label>
                                    <Form.Control type="tel" placeholder="Telefono celular" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Domicilio</Form.Label>
                                    <Form.Control type="tel" placeholder="Domicilio" />
                            </Form.Group>
                        </Col>
                        
                    </Row>
                </Form>
            </Container>
            
        )
    }
}

export default Formulario0