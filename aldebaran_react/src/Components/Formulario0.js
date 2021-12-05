import React from 'react'
import {Button , Form , Container ,Row ,Col ,Alert , Popover , Overlay } from 'react-bootstrap'
import SweetAlert from 'sweetalert2-react';
// import servicios from '../services/conexion'


// import Select from 'react-select'

class Formulario0 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            //Mensajes que aparecen en la ionterfaz
            msgServicio:"Sólo aparecen los servicios educativos disponibles a la fecha de registro. No podrás registrarse a alguno diferente al aprobado por la Coordinación.",
            msg : "Primera aplicacion React",
            inputValue:"Bienvenido",
            opciones : [
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
        this.onSeleccion = this.onSeleccion.bind(this);  
        this.uploadPhoto = this.uploadPhoto.bind(this)
        this.dataForm0 = this.dataForm0.bind(this); 
    }
    /*  
        ===========================================================================
                    Funciones que ayudan en la logica del proyecto
        ===========================================================================
    */
    getDatos(){
        console.log("Esta funcion deberia de mandar la informacion al api");
    }
    //Esta funcion nos ayuda a obtener todos los datos del formulario
    //Evetos onChange para obtener los datos con React Js 
    handlechange(event){
        this.setState({n_max_estudios: event.target.value});
    }
    onSeleccion(event){
        this.setState({modalidad: event.target.value});        
    }
    uploadPhoto(event){
        var photoUser = event.target.value;
        if (photoUser === ""){
            console.log("No se ha cargado ninguna imagen");
        }else{
            console.log("Imagen cargada");
            console.log(event.target.value);
            this.setState({file_fotografia: event.target.value});        
        }
    }
    dataForm0(event , data){
        if(data === "email"){
            this.setState({email_Alumno: event.target.value});        
        }else if (data === "curp"){
            this.setState({curp_Alumno: event.target.value});        
        }else if (data === "nombre"){
            this.setState({nombre_Alumno: event.target.value});        
        }else if (data === "appPat"){
            this.setState({appPat_Alumno: event.target.value});        
        }else if (data === "appMat"){
            this.setState({appMat_Alumno: event.target.value});        
        }else if (data === "nacimiento"){
            this.setState({fechaNac_Alumno: event.target.value});        
        }else if (data === "edad"){
            this.setState({edad_Alumno: event.target.value});        
        }else if (data === "telpar"){
            this.setState({telPar_Alumno: event.target.value});        
        }else if (data === "telcel"){
            this.setState({telCel_Alumno: event.target.value});        
        }else if (data === "calle"){
            this.setState({calle_Alumno: event.target.value});        
        }else if (data === "numero"){
            this.setState({num_Alumno: event.target.value});        
        }else if (data === "colonia"){
            this.setState({col_Alumno: event.target.value});        
        }else if (data === "cp"){
            this.setState({cp_Alumno: event.target.value});        
        }else if (data === "municipio"){
            this.setState({municipio_Alumno: event.target.value});        
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
    apiServicios = () =>{
        var array;
        fetch('http://localhost:5000/ServEducativo')
        .then((resp) => resp.json())
        .then(function(data) {
            return data["Servicios"];
        })
        .catch(function(error) {
            console.log(error);
        });
        console.log(array);
    }

    render() {
        var {opciones} = this.state
        return (
            <div fluid="md" className="mb-5">
                <SweetAlert
                show={this.state.show}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={() => this.setState({ show: false })}
                />
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
                                <Form.Control type="file"  accept="image/*" onChange={this.uploadPhoto}/>
                            </Form.Group>
                        </Col>
                        <Col sm >
                            <Form.Group className="mb-3">
                                <Form.Label className="h5">Email</Form.Label>
                                <Form.Control type="email" placeholder="Email"  onChange={ (evt) => this.dataForm0(evt , "email")} />
                            </Form.Group>
                            {this.state.email_Alumno}
                        </Col>
                        <Col sm>
                            <Form.Group >
                                <Form.Label className="h5">Curp</Form.Label>
                                <Form.Control type="text" placeholder="Curp"  onChange={ (evt) => this.dataForm0(evt , "curp")}/>
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
                                <Form.Control type="text" placeholder="Nombre"   onChange={ (evt) => this.dataForm0(evt , "nombre")}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Apellido paterno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido paterno"  onChange={ (evt) => this.dataForm0(evt , "appPat")} />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Apellido Materno"  onChange={ (evt) => this.dataForm0(evt , "appMat")}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Group className="mb-3" >
                                <Form.Label  className="h5">Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" onChange={ (evt) => this.dataForm0(evt , "nacimiento")} />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Edad</Form.Label>
                                <Form.Control type="Number" placeholder="Edad" min="0" max="120" onChange={ (evt) => this.dataForm0(evt , "edad")}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono particular</Form.Label>
                                <Form.Control type="tel" placeholder="Telefono particular" onChange={ (evt) => this.dataForm0(evt , "telpar")} />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3">
                                <Form.Label  className="h5">Telefono celular</Form.Label>
                                    <Form.Control type="tel" placeholder="Telefono celular" onChange={ (evt) => this.dataForm0(evt , "telcel")} />
                            </Form.Group>
                        </Col>
                    </Row>
                        <Row >
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Calle</Form.Label>
                                        <Form.Control type="text" placeholder="Calle" onChange={ (evt) => this.dataForm0(evt , "calle")} />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Numero</Form.Label>
                                    <Form.Control type="Number" placeholder="Edad" min="0" onChange={ (evt) => this.dataForm0(evt , "numero")} />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Colonia</Form.Label>
                                        <Form.Control type="text" placeholder="Colonia" onChange={ (evt) => this.dataForm0(evt , "colonia")}/>
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Codigo postal</Form.Label>
                                        <Form.Control type="number" placeholder="Codigo postal" onChange={ (evt) => this.dataForm0(evt , "cp")} />
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group className="mb-3">
                                    <Form.Label  className="h5">Municipio</Form.Label>
                                        <Form.Control type="text" placeholder="Municipio" onChange={ (evt) => this.dataForm0(evt , "municipio")}/>
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
                                <Form.Control type="text" placeholder="Nombre"   onChange={ (evt) => this.dataForm0(evt , "edad")}/>
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
                            <Button  type="button" className=" mt- 3 mb-3 col-4" style={{background: '#A90101', color: '#FFFFFF' }}  onClick={() => this.setState({ show: true })}>
                                Enviar
                            </Button>
                            {/* <Button  type="button" className=" mt- 3 mb-3 col-4" style={{background: '#A90101', color: '#FFFFFF' }}  onClick={() => this.setState({ show: true })}>
                                Enviar
                            </Button> */}
                        </Col>
                    </Row>
                </Form>
            </div>
            
        )
    }
}

export default Formulario0