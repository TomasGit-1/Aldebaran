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
            <div fluid="md" className="mb-5">
                <Form>
                    <Row>
                        <div className="mt-2 "  style={{background: '#015757', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                                <small className="mt-0">Datos personales del alumno </small>
                        </div>
                    </Row>
                    <Row >
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <Col sm className="mt-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Modalidad</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Virtual</option>
                                    <option value="1">Presencial</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mt-3">
                                <Form.Label>Curp</Form.Label>
                                <Form.Control type="text" placeholder="Curp" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"   value={this.state.inputValue}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Genero</Form.Label>
                                {/* <Select   options={this.state.options}  /> */}
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Mujer</option>
                                    <option value="1">Hombre</option>
                                </Form.Select>
                            </Form.Group>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="Number" placeholder="Edad" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono particular</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono particular" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono celular</Form.Label>
                                    <Form.Control type="tel" placeholder="Telefono celular" />
                            </Form.Group>
                        </Col>
                    </Row>
                        {/* <Row  xs="auto">
                            <Col  xs={6} md={4} sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Telefono celular</Form.Label>
                                        <Form.Control type="tel" placeholder="Telefono celular" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={8} sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Domicilio</Form.Label>
                                        <Form.Control type="text" placeholder="Domicilio" />
                                </Form.Group>
                            </Col>
                        </Row> */}
                        <Row >
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Calle</Form.Label>
                                        <Form.Control type="text" placeholder="Calle" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Colonia</Form.Label>
                                        <Form.Control type="text" placeholder="Colonia" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Codigo postal</Form.Label>
                                        <Form.Control type="text" placeholder="Codigo postal" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Municipio</Form.Label>
                                        <Form.Control type="text" placeholder="Municipio" />
                                </Form.Group>
                            </Col>
                        </Row>
                    <Row>
                        <div className="mt-2 mb-2"  style={{background: '#015757', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                                <small className="mt-0">Contacto de emergencia</small>
                        </div>
                        <Col sm >
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono particular</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono de contacto" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Button  type="submit" className=" mt- 3 mb-3 col-4" style={{background: '#015757', color: '#FFFFFF' }}>
                                Enviar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            
        )
    }
}

export default Formulario0