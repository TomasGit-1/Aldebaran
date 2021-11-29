import React from 'react'
import {Button , Form , Container ,Row ,Col ,Alert , Popover , Overlay } from 'react-bootstrap'
// import Select from 'react-select'




class Formulario0 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Mensajes que aparecen en la ionterfaz
            msgServicio:"Sólo aparecen los servicios educativos disponibles a la fecha de registro. No podrás registrarse a alguno diferente al aprobado por la Coordinación.",
            msg : "Primera aplicacion React",
            inputValue:"Bienvenido",
            opciones : [
                "Uno",
                "Dos",
                "Tres"
            ],
            opciones2 : [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ],
            //Datos de entrada del alumno
            n_max_estudios:"",
            modalidad:"",
            file_fotografia:null,
            email_Alumno:"",
            curp_Alumno:"",
            fileCurp_Alumno:null,
            genero :"",
            nombre_Alumno:"",
            appPat_Alumno:"",
            appMat_Alumno:"",
            fechaNac_Alumno:"",
            edad_Alumno:0,
            telPar_Alumno:"",
            telCel_Alumno:"",
            //Variables para el domicilio del alumno
            calle_Alumno:"", 
            num_Alumno:"",
            col_Alumno:"",
            cp_Alumno:0,
            municipio_Alumno:"",
            //Contacto de emergencia
            nombre_Emerge:"",
            appPat_Emerge:"",
            appMat_Emerge:"",
            telContacto_Emerge:"",
            email_Emerge:""
        };
        this.getDatos = this.getDatos.bind(this);  
        this.handlechange = this.handlechange.bind(this);  
    }
    getDatos(){
        console.log("getDatos");
    }
    handlechange(event)
    {
        this.setState({n_max_estudios: event.target.value});
    }
    render() {


        var {opciones} = this.state
        return (

            <div fluid="md" className="mb-5">
                <Form>
                    <Row>
                        <div className="mt-2 "  style={{background: '#A90101', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                            <small className="mt-0">Servicio educativo</small>
                        </div>
                        <p>
                            
                        </p>
                        <Col sm className="mt-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="h5 ">Servicio educativo *</Form.Label>
                                <p> {this.state.msgServicio}</p>
                                    <Form.Select onChange={this.handlechange}  name={this.state.n_max_estudios}>
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
                                <Form.Label  className="h5 mt-3 mb-5">Modalidad *</Form.Label>
                            </Row>
                                <Form.Check
                                    inline
                                    label="Virtual"
                                    name="modalidad"
                                    type="radio"
                                />
                                <Form.Check
                                    inline
                                    label="Presencial"
                                    name="modalidad"
                                    type="radio"
                                />
                        </Col>
                    </Row>
                    
                    <Row>
                        <div className="mt-2 "  style={{background: '#A90101', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                            <small className="mt-0">Datos personales del participante </small>
                        </div>
                    </Row>
                    <Row className="mt-3">
                        <Col sm >
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="h5">Fotografía *</Form.Label>
                                <Form.Control type="file"  accept="image/*" />
                            </Form.Group>
                        </Col>
                        <Col sm >
                            <Form.Group className="mb-3">
                                <Form.Label className="h5">Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group >
                                <Form.Label className="h5">Curp</Form.Label>
                                <Form.Control type="text" placeholder="Curp" />
                            </Form.Group>
                        </Col>
                        <Col sm >
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="h5">Archivo de CURP *</Form.Label>
                                <Form.Control type="file"  accept=".pdf" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group>
                                <Form.Label className="h5" >Genero</Form.Label>
                                {/* <Select   options={this.state.options}  /> */}
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione una opcion</option>
                                    <option value="0">Mujer</option>
                                    <option value="1">Hombre</option>
                                </Form.Select>
                            </Form.Group>
                        
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"   value={this.state.inputValue}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Edad</Form.Label>
                                <Form.Control type="Number" placeholder="Edad" min="0" max="120"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono particular</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono particular" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono celular</Form.Label>
                                    <Form.Control type="tel" placeholder="Telefono celular" />
                            </Form.Group>
                        </Col>
                    </Row>
                        <Row >
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Calle</Form.Label>
                                        <Form.Control type="text" placeholder="Calle" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Numero</Form.Label>
                                    <Form.Control type="Number" placeholder="Edad" min="0" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Colonia</Form.Label>
                                        <Form.Control type="text" placeholder="Colonia" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Codigo postal</Form.Label>
                                        <Form.Control type="number" placeholder="Codigo postal" />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Municipio</Form.Label>
                                        <Form.Control type="text" placeholder="Municipio" />
                                </Form.Group>
                            </Col>
                        </Row>
                    <Row>
                        <div className="mt-2 mb-2"  style={{background: '#A90101', color: '#FFFFFF' , height:"30px" , borderRadius:"5px"}}>
                                <small className="mt-0">Contacto de emergencia</small>
                        </div>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"   value={this.state.inputValue}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono de contacto</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono de contacto" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5">Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Button  type="button" className=" mt- 3 mb-3 col-4" style={{background: '#A90101', color: '#FFFFFF' }}  onClick={ () => this.getDatos()}>
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