import React from 'react'
import axios from 'axios'
import { Button, Form, Container, Row, Col, Alert , ButtonGroup , Table , Dropdown} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Moment from 'moment'
import NavbarMain from '../Components/NavbarS'

class FormularioC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            informacion:[],
            titles: [
                { value: 0, text: "Datos personales" },
                { value: 1, text: "Formacion Academica" },
                { value: 2, text: "Datos laborales" },
                { value: 3, text: "Información Adicional" }
            ],
            urlApi: "",
            puertoApi: "",

            show: false,
            //Mensajes que aparecen en la ionterfaz
            msgServicio: "Sólo aparecen los servicios educativos disponibles a la fecha de registro. No podrás registrarse a alguno diferente al aprobado por la Coordinación.",
            msg: "Primera aplicacion React",
            inputValue: "Bienvenido",

            //Datos de entrada del alumno
            n_max_estudios: "",
            modalidad: "",
            file_fotografia: null,
            email_Alumno: "",
            curp_Alumno: "",
            fileCurp_Alumno: null,
            genero: "",
            nombre_Alumno: "",
            appPat_Alumno: "",
            appMat_Alumno: "",
            fechaNac_Alumno: "",
            edad_Alumno: 0,
            telPar_Alumno: "",
            telCel_Alumno: "",
            //Variables para el domicilio del alumno
            calle_Alumno: "",
            num_Alumno: "",
            col_Alumno: "",
            cp_Alumno: 0,
            municipio_Alumno: "",
            //Contacto de emergencia
            nombre_Emerge: "",
            appPat_Emerge: "",
            appMat_Emerge: "",
            telContacto_Emerge: "",
            email_Emerge: "",
            validacionCurp: "",
            howForm: false,
            showTable: true,
        };
        this.SendDatos = this.SendDatos.bind(this);
        this.handlechange = this.handlechange.bind(this);
        this.onSeleccion = this.onSeleccion.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this)
        this.dataForm0 = this.dataForm0.bind(this);
        this.uploadFileCurp = this.uploadFileCurp.bind(this);
        this.SeleccGenero = this.SeleccGenero.bind(this);
        this.existeCurpAlum = this.existeCurpAlum.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.ver = this.ver.bind(this);
        this.editar = this.editar.bind(this);
    }
    /*  
        ===========================================================================
                Funciones que ayudan en la logica del proyecto
        ===========================================================================
    */
    componentDidMount() {
        this.apiAlumnos();
    }
    apiAlumnos = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/api/Alumnos")
            var responseJson = await response.json();
            let arrayInfo = []
            for (let index = 0; index < responseJson.length; index++) {
                let arrayRow = [];
                arrayRow.push(responseJson[index].idpersona);
                arrayRow.push(responseJson[index].curp);
                arrayRow.push(responseJson[index].nombre);
                arrayRow.push(responseJson[index].appmat);
                arrayRow.push(responseJson[index].apppat);
                arrayRow.push(responseJson[index].sexo);
                var dateNacimiento = new Moment( responseJson[index].fechanacimiento).format('DD/MM/YYYY');
                arrayRow.push(dateNacimiento);
                arrayRow.push(responseJson[index].telpar);
                arrayRow.push(responseJson[index].telcel);
                arrayInfo.push(arrayRow);
            }
            this.setState({informacion:arrayInfo})
        } catch (e) {
            console.log(e);
        }
    }
    ver(item){
        console.log("Se presiono el boton de ver");
        console.log(item);
    }
    editar(item){
        console.log("Se presiono el boton de editar");
        console.log(item);
    
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
    existeCurpAlum = async () => {
        let validacion = {
            curpAlum: this.state.curp_Alumno,
        }
        if (validacion.curpAlum === "") {
            var msg = 'El campo curp  esta vacio';
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: msg,
            })
        } else {
            const respuesta = await axios.post('http://localhost:5000/Api/ExisteCurp', {
                validacion,
            }).then(function (response) {
                return response.data.mensaje;
            }).catch(function (error) {
                console.log(error.message)
            })
            if (respuesta === 0) {
                this.validarCamposVacion();
                console.log("No existe la curp y si podemos agregar")
            } else {
                console.log("Si existe , no podemos agregar");
            }
        }
    }
    validarCamposVacion() {
        let validacion = {
            //Datos de entrada del alumno
            n_max_estudios: this.state.n_max_estudios,
            modalidad: this.state.modalidad,
            file_fotografia: this.state.file_fotografia,
            email_Alumno: this.state.email_Alumno,
            curp_Alumno: this.state.curp_Alumno,
            fileCurp_Alumno: this.state.fileCurp_Alumno,
            genero: this.state.genero,
            nombre_Alumno: this.state.nombre_Alumno,
            appPat_Alumno: this.state.appPat_Alumno,
            appMat_Alumno: this.state.appMat_Alumno,
            fechaNac_Alumno: this.state.fechaNac_Alumno,
            edad_Alumno: this.state.edad_Alumno,
            telPar_Alumno: this.state.telPar_Alumno,
            telCel_Alumno: this.state.telCel_Alumno,
            //Variables para el domicilio del alumno
            calle_Alumno: this.state.calle_Alumno,
            num_Alumno: this.state.num_Alumno,
            col_Alumno: this.state.col_Alumno,
            cp_Alumno: this.state.cp_Alumno,
            municipio_Alumno: this.state.municipio_Alumno,
            //Contacto de emergencia
            nombre_Emerge: this.state.nombre_Emerge,
            appPat_Emerge: this.state.appPat_Emerge,
            appMat_Emerge: this.state.appMat_Emerge,
            telContacto_Emerge: this.state.telContacto_Emerge,
            email_Emerge: this.state.email_Emerge
        };
        console.log("Vamos a validar que la informacion si este");
        if (validacion.registro === "") {

        } else if (validacion.evento === "") {

        } else if (validacion.nombre === "") {
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'El camppo Nombre del programa academico esta vacio',
        })
    }
    SendDatos() {
        console.log("Esta funcion deberia de mandar la informacion al api");
        console.log(this.state.curp_Alumno);
        let data = {
            //Datos de entrada del alumno
            n_max_estudios: this.state.n_max_estudios,
            modalidad: this.state.modalidad,
            file_fotografia: this.state.file_fotografia,
            email_Alumno: this.state.email_Alumno,
            curp_Alumno: this.state.curp_Alumno,
            fileCurp_Alumno: this.state.fileCurp_Alumno,
            genero: this.state.genero,
            nombre_Alumno: this.state.nombre_Alumno,
            appPat_Alumno: this.state.appPat_Alumno,
            appMat_Alumno: this.state.appMat_Alumno,
            fechaNac_Alumno: this.state.fechaNac_Alumno,
            edad_Alumno: this.state.edad_Alumno,
            telPar_Alumno: this.state.telPar_Alumno,
            telCel_Alumno: this.state.telCel_Alumno,
            //Variables para el domicilio del alumno
            calle_Alumno: this.state.calle_Alumno,
            num_Alumno: this.state.num_Alumno,
            col_Alumno: this.state.col_Alumno,
            cp_Alumno: this.state.cp_Alumno,
            municipio_Alumno: this.state.municipio_Alumno,
            //Contacto de emergencia
            nombre_Emerge: this.state.nombre_Emerge,
            appPat_Emerge: this.state.appPat_Emerge,
            appMat_Emerge: this.state.appMat_Emerge,
            telContacto_Emerge: this.state.telContacto_Emerge,
            email_Emerge: this.state.email_Emerge
        };
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
        }

        // let formData = new FormData() 
        // formData.set('data', data);
        // axios.post('http://localhost:5000/createRegistro', {
        //     data, headers: {'content-type': 'multipart/form-data'}
        // })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     }).catch(function (error) {
        //     });

        var url = "http://localhost:5000/createRegistro";
        var bodyFormData = new FormData();
        bodyFormData.append('fileImg', this.state.file_fotografia);
        bodyFormData.append('emailAlum', this.state.email_Alumno);
        bodyFormData.append('curp', this.state.curp_Alumno);
        bodyFormData.append('fileCurp', this.state.fileCurp_Alumno);

        bodyFormData.append('genero', this.state.fileCurp_Alumno);
        bodyFormData.append('nombreAlum', this.state.file_fotografia);
        bodyFormData.append('appPatAlum', this.state.curp_Alumno);
        bodyFormData.append('appMatAlum', this.state.fileCurp_Alumno);
        bodyFormData.append('fechaNacimiento', this.state.file_fotografia);
        bodyFormData.append('edad', this.state.curp_Alumno);
        bodyFormData.append('telParticularAlum', this.state.fileCurp_Alumno);
        bodyFormData.append('telCelularAlum', this.state.file_fotografia);
        bodyFormData.append('calle', this.state.curp_Alumno);
        bodyFormData.append('NumeroDom', this.state.fileCurp_Alumno);
        bodyFormData.append('colonia', this.state.file_fotografia);
        bodyFormData.append('codigoPostal', this.state.curp_Alumno);
        bodyFormData.append('municipio', this.state.fileCurp_Alumno);
        //Datos del contacto de emergencia
        bodyFormData.append('nombreEmergencia', this.state.file_fotografia);
        bodyFormData.append('appPatEmergencia', this.state.curp_Alumno);
        bodyFormData.append('appMatEmergencia', this.state.fileCurp_Alumno);
        bodyFormData.append('telEmergencia', this.state.file_fotografia);
        //Formacion academica
        bodyFormData.append('nivMaxStudy', this.state.curp_Alumno);
        bodyFormData.append('acadSituacion', this.state.fileCurp_Alumno);
        bodyFormData.append('insEducativa', this.state.file_fotografia);
        bodyFormData.append('anioEgreso', this.state.curp_Alumno);
        bodyFormData.append('evidenciaPoli', this.state.fileCurp_Alumno);
        //Datos laborales 
        bodyFormData.append('nombreInst', this.state.file_fotografia);
        bodyFormData.append('domicilioInst', this.state.curp_Alumno);
        bodyFormData.append('puestoInst', this.state.fileCurp_Alumno);
        bodyFormData.append('telefonoInst', this.state.file_fotografia);

        axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Aqui");

        }).catch(function (error) {
            console.log(error.message)
        })
    }
    //Esta funcion nos ayuda a obtener todos los datos del formulario
    //Evetos onChange para obtener los datos con React Js 
    handlechange(event) {
        console.log(event.target.value);
        this.setState({ n_max_estudios: event.target.value });
    }
    onSeleccion(event) {
        console.log(event.target.value);
        this.setState({ modalidad: event.target.value });
    }
    SeleccGenero(event) {
        console.log(event.target.value);
        this.setState({ genero: event.target.value });
    }
    uploadPhoto(event) {
        var photoUser = event.target.value;
        if (photoUser === "") {
            console.log("No se ha cargado ninguna imagen");
        } else {
            console.log("Imagen cargada");
            console.log(event.target.value);
            this.setState({ file_fotografia: event.target.value });
        }
    }
    uploadFileCurp(event) {
        var fileCurp = event.target.value;
        if (fileCurp === "") {
            console.log("No se ha cargado ninguna archivo");
        } else {
            console.log("Curp crgada");
            console.log(event.target.value);
            this.setState({ fileCurp_Alumno: event.target.value });
        }
    }
    dataForm0(event, data) {
        if (data === "email") {
            this.setState({ email_Alumno: event.target.value });
        } else if (data === "curp") {
            this.setState({ curp_Alumno: event.target.value });
        } else if (data === "nombre") {
            this.setState({ nombre_Alumno: event.target.value });
        } else if (data === "appPat") {
            this.setState({ appPat_Alumno: event.target.value });
        } else if (data === "appMat") {
            this.setState({ appMat_Alumno: event.target.value });
        } else if (data === "nacimiento") {
            this.setState({ fechaNac_Alumno: event.target.value });
        } else if (data === "edad") {
            this.setState({ edad_Alumno: event.target.value });
        } else if (data === "telpar") {
            this.setState({ telPar_Alumno: event.target.value });
        } else if (data === "telcel") {
            this.setState({ telCel_Alumno: event.target.value });
        } else if (data === "calle") {
            this.setState({ calle_Alumno: event.target.value });
        } else if (data === "numero") {
            this.setState({ num_Alumno: event.target.value });
        } else if (data === "colonia") {
            this.setState({ col_Alumno: event.target.value });
        } else if (data === "cp") {
            this.setState({ cp_Alumno: event.target.value });
        } else if (data === "municipio") {
            this.setState({ municipio_Alumno: event.target.value });
        } else if (data === "nombre_Emerge") {
            this.setState({ nombre_Emerge: event.target.value });
        } else if (data === "appPat_Emerge") {
            this.setState({ appPat_Emerge: event.target.value });
        } else if (data === "appMat_Emerge") {
            this.setState({ appMat_Emerge: event.target.value });
        } else if (data === "telContacto_Emerge") {
            this.setState({ telContacto_Emerge: event.target.value });
        } else if (data === "email_Emerge") {
            this.setState({ email_Emerge: event.target.value });
        }
    }

    /*  
        ===========================================================================
                    Esta funcion trae toodos los servicios educativos 
                        que esten en la base de datos
        ===========================================================================
    */
    render() {
        let { showForm } = this.state
        let { showTable } = this.state
        let { informacion} = this.state

        return (
            <main>
                <section>
                    <NavbarMain />
                </section>
                {showForm ?
                    <section>
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
                            <Form>
                                <section>
                                    <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Datos personales</h5>
                                        </Alert >
                                    </Row>
                                    <Row className="mt-3">
                                        <Col sm >
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label className="h5">Fotografía *</Form.Label>
                                                <Form.Control type="file" accept="image/*" onChange={this.uploadPhoto} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm >
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Email</Form.Label>
                                                <Form.Control type="email" placeholder="Email" onChange={(evt) => this.dataForm0(evt, "email")} />
                                            </Form.Group>
                                            {this.state.email_Alumno}
                                        </Col>
                                        <Col sm>
                                            <Form.Group >
                                                <Form.Label className="h5">Curp</Form.Label>
                                                <Form.Control type="text" placeholder="Curp" onChange={(evt) => this.dataForm0(evt, "curp")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm >
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label className="h5">Archivo de curp *</Form.Label>
                                                <Form.Control type="file" accept=".pdf" onChange={this.uploadFileCurp} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm>
                                            <Form.Group>
                                                <Form.Label className="h5" >Genero</Form.Label>
                                                {/* <Select   options={this.state.options}  /> */}
                                                <Form.Select aria-label="Default select example" onChange={this.SeleccGenero}>
                                                    <option>Seleccione una opcion</option>
                                                    <option value="Mujer">Mujer</option>
                                                    <option value="Hombre">Hombre</option>
                                                </Form.Select>
                                            </Form.Group>

                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" onChange={(evt) => this.dataForm0(evt, "nombre")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className="h5">Apellido paterno</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido paterno" onChange={(evt) => this.dataForm0(evt, "appPat")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Apellido Materno</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido Materno" onChange={(evt) => this.dataForm0(evt, "appMat")} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className="h5">Fecha de nacimiento</Form.Label>
                                                <Form.Control type="date" onChange={(evt) => this.dataForm0(evt, "nacimiento")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Edad</Form.Label>
                                                <Form.Control type="Number" placeholder="Edad" min="0" max="120" onChange={(evt) => this.dataForm0(evt, "edad")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Telefono particular</Form.Label>
                                                <Form.Control type="tel" placeholder="Telefono particular" onChange={(evt) => this.dataForm0(evt, "telpar")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Telefono celular</Form.Label>
                                                <Form.Control type="tel" placeholder="Telefono celular" onChange={(evt) => this.dataForm0(evt, "telcel")} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Calle</Form.Label>
                                                <Form.Control type="text" placeholder="Calle" onChange={(evt) => this.dataForm0(evt, "calle")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Numero</Form.Label>
                                                <Form.Control type="Number" placeholder="Edad" min="0" onChange={(evt) => this.dataForm0(evt, "numero")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Colonia</Form.Label>
                                                <Form.Control type="text" placeholder="Colonia" onChange={(evt) => this.dataForm0(evt, "colonia")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Codigo postal</Form.Label>
                                                <Form.Control type="number" placeholder="Codigo postal" onChange={(evt) => this.dataForm0(evt, "cp")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Municipio</Form.Label>
                                                <Form.Control type="text" placeholder="Municipio" onChange={(evt) => this.dataForm0(evt, "municipio")} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5 >Contacto de emergencia</h5>
                                        </Alert>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" onChange={(evt) => this.dataForm0(evt, "nombre_Emerge")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className="h5">Apellido paterno</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido paterno" onChange={(evt) => this.dataForm0(evt, "appPat_Emerge")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Apellido Materno</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido Materno" onChange={(evt) => this.dataForm0(evt, "appMat_Emerge")} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Telefono de contacto</Form.Label>
                                                <Form.Control type="tel" placeholder="Telefono de contacto" onChange={(evt) => this.dataForm0(evt, "telContacto_Emerge")} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Email</Form.Label>
                                                <Form.Control type="email" placeholder="Email" onChange={(evt) => this.dataForm0(evt, "email_Emerge")} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </section>

                                <section>
                                    <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Formacion academica del alumno </h5>
                                        </Alert >
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
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Datos laborales</h5>
                                        </Alert >
                                    </Row>
                                    {/* Opcionales */}
                                    <Row>
                                        <Col sm>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className="h5">Nombre de la institución</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido paterno" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Domicilio</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido Materno" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className="h5">Puesto</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido paterno" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="h5">Telefono</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido Materno" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </section>
                                <section>
                                    <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Información Adicional </h5>
                                        </Alert >
                                    </Row>
                                </section>
                                <Row>
                                    <Col sm>
                                        <Button type="button" className=" mt- 3 mb-3 col-4" style={{ background: '#A90101', color: '#FFFFFF' }} onClick={() => this.existeCurpAlum()}>
                                            Enviar
                                        </Button>
                                        {/* <Button  type="button" className=" mt- 3 mb-3 col-4" style={{background: '#A90101', color: '#FFFFFF' }}  onClick={() => this.setState({ show: true })}>
                                            Enviar
                                        </Button> */}
                                    </Col>
                                </Row>
                            </Form>
                        </Container>

                    </section>
                    : null
                }
                {showTable ?

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
                            {/* {
                                id.length === 0 ?
                                    <Container className="mb-3"  >
                                        <div className="alert alert-danger mt-2" role="alert">
                                            No hay servicios en la base de datos
                                        </div>
                                    </Container>
                                    : null
                            } */}
                            <div className="table-responsive " style={{ height: "500px" }}>
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Curp</th>
                                            <th>Nombre</th>
                                            <th>Sexo</th>
                                            <th>Fecha de nacimiento</th>
                                            <th>Telefono particular</th>
                                            <th>Telefono celular</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        informacion.map((index) => (
                                            <tr key={index}>
                                                <td >{index[0]}</td>
                                                <td >{index[1]}</td>
                                                <td >{index[2] +' '+ index[3] +' '+ index[4]}</td>
                                                <td >{index[5]}</td>
                                                <td >{index[6]}</td>
                                                <td >{index[7]}</td>
                                                <td >{index[8]}</td>
                                                
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => this.editar(index[1])} >
                                                                {/* <Button onClick={() => this.editar(index)}><i className="bi bi-pencil"></i></Button> */}
                                                                 <i className="bi bi-pencil"></i>Editar
                                                            </Dropdown.Item>

                                                            <Dropdown.Item onClick={() => this.ver(index[1])}>
                                                                 <i className="bi bi-eye"></i>Ver
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                        } 

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

export default FormularioC