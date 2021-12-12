import React from 'react'
import {Button , Form , Container ,Row ,Col} from 'react-bootstrap'

class Formulario1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
            
        };
    }
    render() {
        return (
            <div fluid="md" className="mb-5">

                <Form>
                    <Row>
                        <div className="mt-2 "  style={{background: '#A90101', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                                <small className="mt-0">Formacion academica del alumno </small>
                        </div>
                    </Row>
                    <Row>
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Nivel maximo de estudios</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Basico</option>
                                    <option value="1">Medio Superior</option>
                                    <option value="2">Superior</option>
                                    <option value="3">Posgrado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Situacion academica</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Estudiante (Cursando)</option>
                                    <option value="1">Pasante</option>
                                    <option value="2">Titulado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Institucion educativa</Form.Label>
                                <Form.Control type="text" placeholder="Institucion Educativa" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label>Año de egreso</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm className="mb-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>En caso de ser comunidad politecnica adjuntar evidencia</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <div className="mt-2 "  style={{background: '#A90101', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                                <small className="mt-0">Datos laborales</small>
                        </div>
                    </Row>
                    {/* Opcionales */}
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Nombre de la institución</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Domicilio</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Puesto</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Formulario1