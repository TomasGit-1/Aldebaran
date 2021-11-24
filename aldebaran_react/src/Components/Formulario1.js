import React from 'react'
import {Button , Form , Container ,Row ,Col} from 'react-bootstrap'

class Formulario1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
        }   
    }
    render() {
        return (
            <div fluid="md" className="mb-5">

                <Form>
                    <Row>
                        <div className="mt-2 "  style={{background: '#015757', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
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
                                    <option value="1">Medio superior</option>
                                    <option value="2">superior</option>
                                    <option value="3">Posgrado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Situacion academica</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Estudiante</option>
                                    <option value="1">Pasante</option>
                                    <option value="2">Titulado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label>Intitucion educativa</Form.Label>
                                <Form.Control type="text" placeholder="Intitucion Educativa" />
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
                </Form>
            </div>
        )
    }
}

export default Formulario1