import React from 'react'
import axios from 'axios'
import { Button, Form, Container, Row, Col, ButtonGroup, Table, Dropdown, Modal  } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import Moment from 'moment'
import NavbarMain from '../Components/NavbarS'
import PDFAlumno from './PDFalumno'
import $ from 'jquery';
import config from '../config/config.json';
import download from 'downloadjs';
class FormularioC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            informacion: [],
            titles: [
                { value: 0, text: "Datos personales" },
                { value: 1, text: "Formacion Academica" },
                { value: 2, text: "Datos laborales" },
                { value: 3, text: "Información Adicional" }
            ],
            //Variables para el puerto apu
            urlApi: "",

            puertoApi: "",

            //Mensajes que aparecen en la ionterfaz
            msgServicio: "Sólo aparecen los servicios educativos disponibles a la fecha de registro. No podrás registrarse a alguno diferente al aprobado por la Coordinación.",
            inputValue: "Bienvenido",
            msg:"",
            //Datos de entrada del alumno
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

            //Formacion academica
            n_max_estudios: "",
            sitAcademico: "",
            instEducativa: "",
            anioEgresoi: "",
            fileEvideciaIPN: null,

            //Datos laborales
            nombInstLaboral: "",
            domicilioLaboral: "",
            puesto: "",
            telefonoTra: "",
            //Validacion
            fileValCurp: false,
            fileValImg: false,
            fileValIpn: false,

            //Show formularios
            show: false,
            showForm: false,
            showTable: true,
            modalShow: false

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
        this.filterInput = this.filterInput.bind(this);
        this.closeOpenModal = this.closeOpenModal.bind(this);
        this.SeleccMaxEstudios = this.SeleccMaxEstudios.bind(this);
        this.SeleccSituacionAcademina = this.SeleccSituacionAcademina.bind(this);
        this.uploadFileEvidencia = this.uploadFileEvidencia.bind(this);
        this.getDownloadFile = this.getDownloadFile.bind(this);

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
            // const response = await fetch("http://localhost:5000/api/Alumnos")
            const response = await fetch(config.general[0].url + config.general[0].puerto_api + "/api/Alumnos");
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
                var dateNacimiento = new Moment(responseJson[index].fechanacimiento).format('DD/MM/YYYY');
                arrayRow.push(dateNacimiento);
                arrayRow.push(responseJson[index].telpar);
                arrayRow.push(responseJson[index].telcel);

                arrayRow.push(responseJson[index].email);

                arrayInfo.push(arrayRow);
            }
            this.setState({ informacion: arrayInfo })
        } catch (e) {
            console.log(e);
        }
    }
    ver(item) {
        console.log("Se presiono el boton de ver");
        console.log(item);
    }
    editar(item) {
        console.log("Se presiono el boton de editar");
        console.log(item);
    }
    ShowForm(num) {
        if (num === 1) {
            this.setState({
                showForm: true,
                showTable: false,
            });
        } else if (num === 0) { 
            this.setState({
                showForm: false,
                showTable: true,
            });
        }
    }
    closeOpenModal(num) {
        if (num === 1) {
            this.setState({
                modalShow: true,
            });
        } else if (num === 0) {
            this.setState({
                modalShow: true,
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
            const respuesta = await axios.post(config.general[0].url + config.general[0].puerto_api + '/api/ExisteCurp', {
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
                var msg = 'la curp ya esta registrada';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: msg,
                })
            }
        }
    }
    filterInput() {
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                })
            })
        })
    }
    validarCamposVacion() {

        let validacion = {
            //Datos de entrada del alumno
            fileImg: this.state.file_fotografia,
            email_Alumno: this.state.email_Alumno,
            curp_Alumno: this.state.curp_Alumno,
            fileCurp: this.state.fileCurp_Alumno,
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
            email_Emerge: this.state.email_Emerge,

            //Formacion academica
            n_max_estudios: this.state.n_max_estudios,
            sitAcademico: this.state.sitAcademico,
            instEducativa: this.state.instEducativa,
            anioEgresoi: this.state.anioEgresoi,
            fileEvideciaIPN: this.state.fileEvideciaIPN,

            //Datos laborales
            nombInstLaboral: this.state.nombInstLaboral,
            domicilioLaboral: this.state.domicilioLaboral,
            puesto: this.state.puesto,
            telefonoTra: this.state.fileEvideciaIPN,
        };
        let fileVali = {
            fileValCurp: this.state.fileValCurp,
            fileValImg: this.state.fileValImg,
        }
        console.log("Vamos a validar que la informacion");
        /*
            Omitimos validar los campos:
            1.- Telefono particular

            Formacion academica 
            institucion educativa
            año de agreso
            evidencia en caso de ser IPn

            Datos laborales
        
        */
        var msg = "";
        if (!fileVali.fileValImg) {
            msg = "Cargue la fotografia del alumno"
        } else if (!fileVali.fileValCurp) {
            msg = "cargue la curp en formato pdf";
        } else if (validacion.email_Alumno === "") {
            msg = 'El campo email  esta vacio';
        } else if (validacion.genero === "") {
            msg = 'Seleccione un genero';
        } else if (validacion.nombre_Alumno === "") {
            msg = 'El campo nombre  esta vacio';
        } else if (validacion.appPat_Alumno === "") {
            msg = 'El campo apellido paterno esta vacio';
        } else if (validacion.appMat_Alumno === "") {
            msg = 'El campo apellido materno esta vacio';
        } else if (validacion.fechaNac_Alumno === "") {
            msg = 'Seleccione la fecha de nacimiento';
        } else if (validacion.edad_Alumno === "") {
            msg = 'El campo edad  esta vacio';
        } else if (validacion.telCel_Alumno === "") {
            msg = 'El campo telefono celular  esta vacio';
        } else if (validacion.calle_Alumno === "") {
            msg = 'El campo calle  esta vacio';
        } else if (validacion.num_Alumno === "") {
            msg = 'El campo numero  esta vacio';
        } else if (validacion.col_Alumno === "") {
            msg = 'El campo colonia esta vacio';
        } else if (validacion.cp_Alumno === "") {
            msg = 'El campo codigo postal esta vacio';
        } else if (validacion.municipio_Alumno === "") {
            msg = 'El campo municipio esta vacio';
        } else if (validacion.nombre_Emerge === "") {
            msg = 'El campo nombre del contacto de emergencia esta vacio';
        } else if (validacion.appPat_Emerge === "") {
            msg = 'El campo apellido paterno del contacto de emergencia esta vacio';
        } else if (validacion.appMat_Emerge === "") {
            msg = 'El campo apellido materno del contacto de emergencia esta vacio';
        } else if (validacion.telContacto_Emerge === "") {
            msg = 'El campo telefono del contacto de emergencia esta vacio';
        } else if (validacion.email_Emerge === "") {
            msg = 'El campo email del contacto de emergencia esta vacio';
        } else if (validacion.n_max_estudios === "") {
            msg = 'Seleccione un nivel maximo de estudios';
        } else if (validacion.sitAcademico === "") {
            msg = 'Seleccione Situacion academica ';
        }else{
            msg="";
        }
        if (msg === ""){
            this.SendDatos();
            console.log("Enviamos datos para insertar");
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: msg,
            })
        }
    }

    SendDatos() {
        console.log("Esta funcion deberia de mandar la informacion al api");

        // let data = {
        //     //Datos de entrada del alumno
        //     n_max_estudios: this.state.n_max_estudios,
        //     modalidad: this.state.modalidad,
        //     file_fotografia: this.state.file_fotografia,
        //     email_Alumno: this.state.email_Alumno,
        //     curp_Alumno: this.state.curp_Alumno,
        //     fileCurp_Alumno: this.state.fileCurp_Alumno,
        //     genero: this.state.genero,
        //     nombre_Alumno: this.state.nombre_Alumno,
        //     appPat_Alumno: this.state.appPat_Alumno,
        //     appMat_Alumno: this.state.appMat_Alumno,
        //     fechaNac_Alumno: this.state.fechaNac_Alumno,
        //     edad_Alumno: this.state.edad_Alumno,
        //     telPar_Alumno: this.state.telPar_Alumno,
        //     telCel_Alumno: this.state.telCel_Alumno,
        //     //Variables para el domicilio del alumno
        //     calle_Alumno: this.state.calle_Alumno,
        //     num_Alumno: this.state.num_Alumno,
        //     col_Alumno: this.state.col_Alumno,
        //     cp_Alumno: this.state.cp_Alumno,
        //     municipio_Alumno: this.state.municipio_Alumno,
        //     //Contacto de emergencia
        //     nombre_Emerge: this.state.nombre_Emerge,
        //     appPat_Emerge: this.state.appPat_Emerge,
        //     appMat_Emerge: this.state.appMat_Emerge,
        //     telContacto_Emerge: this.state.telContacto_Emerge,
        //     email_Emerge: this.state.email_Emerge
        // };
        // let formData = new FormData()
        // formData.set('data', data);
        // axios.post(url, {
        //     data, headers: {'content-type': 'multipart/form-data'}
        // })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     }).catch(function (error) {
        //     });

        var url = config.general[0].url + config.general[0].puerto_api + "/Api/createRegistro";
        var bodyFormData = new FormData();
        bodyFormData.append('fileImg', this.state.file_fotografia);
        bodyFormData.append('emailAlum', this.state.email_Alumno);
        bodyFormData.append('curp', this.state.curp_Alumno);
        bodyFormData.append('fileCurp', this.state.fileCurp_Alumno);

        bodyFormData.append('genero', this.state.genero);
        bodyFormData.append('nombreAlum', this.state.nombre_Alumno);
        bodyFormData.append('appPatAlum', this.state.appPat_Alumno);
        bodyFormData.append('appMatAlum', this.state.appMat_Alumno);
        bodyFormData.append('fechaNacimiento', this.state.fechaNac_Alumno);
        bodyFormData.append('edad', this.state.edad_Alumno);
        bodyFormData.append('telParticularAlum', this.state.telPar_Alumno);
        bodyFormData.append('telCelularAlum', this.state.telCel_Alumno);

        bodyFormData.append('calle', this.state.calle_Alumno);
        bodyFormData.append('NumeroDom', this.state.num_Alumno);
        bodyFormData.append('colonia', this.state.col_Alumno);
        bodyFormData.append('codigoPostal', this.state.cp_Alumno);
        bodyFormData.append('municipio', this.state.municipio_Alumno);

        //Datos del contacto de emergencia
        bodyFormData.append('nombreEmergencia', this.state.nombre_Emerge);
        bodyFormData.append('appPatEmergencia', this.state.appPat_Emerge);
        bodyFormData.append('appMatEmergencia', this.state.appMat_Emerge);
        bodyFormData.append('telEmergencia', this.state.telContacto_Emerge);
        bodyFormData.append('emailEmergencia', this.state.email_Emerge);

        //Formacion academica
        bodyFormData.append('nivMaxStudy', this.state.n_max_estudios);
        bodyFormData.append('acadSituacion', this.state.sitAcademico);
        bodyFormData.append('insEducativa', this.state.instEducativa);
        bodyFormData.append('anioEgreso', this.state.anioEgresoi);
        bodyFormData.append('fileEvidencia', this.state.fileEvideciaIPN);
        
        //Datos laborales
        bodyFormData.append('nombreInst', this.state.nombInstLaboral);
        bodyFormData.append('domicilioInst', this.state.domicilioLaboral);
        bodyFormData.append('puestoInst', this.state.puesto);
        bodyFormData.append('telefonoInst', this.state.telefonoTra);
        // headers: { 'Content-Type': 'application/json' }

        axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            // headers: {'content-type': 'multipart/form-data'}
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
    SeleccMaxEstudios(event) {
        console.log(event.target.value);
        this.setState({ n_max_estudios: event.target.value });
    }
    SeleccSituacionAcademina(event) {
        console.log(event.target.value);
        this.setState({ sitAcademico: event.target.value });
    }
    uploadPhoto(event) {
        var photoUser = event.target.value;
        console.log(event.target.files[0]);

        if (photoUser === "") {
            this.setState({ fileValImg: false });
            console.log("No se ha cargado ninguna imagen");
        } else {
            console.log("Imagen cargada");
            console.log(event.target.value);
            this.setState({ fileValImg: true });
            this.setState({ file_fotografia:event.target.files[0] });
        }
    }
    uploadFileCurp(event) {
        var curp = event.target.value;
        console.log(event.target.files[0]);

        if (curp === "") {
            this.setState({ fileValCurp: false });
            console.log("No se ha cargado ninguna archivo");
        } else {
            console.log("Curp crgada");
            this.setState({ fileValCurp: true });
            this.setState({ fileCurp_Alumno: event.target.files[0] });
        }
    }
    uploadFileEvidencia(event) {
        var evidencia = event.target.value;
        console.log(event.target.files[0]);

        if (evidencia === "") {
            console.log("No se ha cargado ninguna archivo");
            this.setState({ fileEvideciaIPN:"false"});
        } else {
            console.log("Curp crgada");
            this.setState({ fileEvideciaIPN:event.target.files[0]});
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
        } else if (data === "InstitucionEducativa") {
            this.setState({ instEducativa : event.target.value });
        } else if (data === "anioegreso") {
            this.setState({ anioEgresoi : event.target.value });
        } else if (data === "laboralinstitucion") {
            this.setState({ nombInstLaboral: event.target.value });
        } else if (data === "laboralDomicilio") {
            this.setState({ domicilioLaboral : event.target.value });
        } else if (data === "laboralPuesto") {
            this.setState({ puesto : event.target.value });
        } else if (data === "laboralTelefono") {
            this.setState({ telefonoTra: event.target.value });
        } 
    }
    getDownloadFile  = async (curp) => {
        console.log("Decargar archivos");
        console.log(curp);
        var formData = new FormData();
        formData.append('curp', curp);
        const res = await fetch(
            config.general[0].url + config.general[0].puerto_api + "/api/downloadFile",
            {
                method: 'POST', // or 'PUT'
                body: formData, // data can be `string` or {object}!
            }
        );
        const blob = await res.blob();
        download(blob, 'imagenDescarga.jpeg');
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
        let { informacion } = this.state

        return (
            <main>
                <section>
                    <NavbarMain />
                </section>
                <section>
                    <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PDFAlumno />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ modalShow: false })}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.setState({ modalShow: true })}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </section>

                {showForm ?
                    <section>
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
                            <Form>
                                {/* <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Datos personales</h5>
                                        </Alert >
                                    </Row> */}
                                <div className="alert alert-info mt-2" role="alert">
                                    Datos personales
                                </div>
                                <Row className="mt-3">
                                    <Col sm >
                                        <Form.Group controlId="formFile1" className="mb-3">
                                            <Form.Label className="h5">Fotografía *</Form.Label>
                                            <Form.Control type="file" accept="image/*" onChange={this.uploadPhoto} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm >
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email" onChange={(evt) => this.dataForm0(evt, "email")} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group >
                                            <Form.Label className="h5">Curp</Form.Label>
                                            <Form.Control type="text" placeholder="Curp" onChange={(evt) => this.dataForm0(evt, "curp")} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm >
                                        <Form.Group controlId="formFile2" className="mb-3">
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
                                <div className="alert alert-info mt-2" role="alert">
                                    Contacto de emergencia
                                </div>
                                <Row>
                                    {/* <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5 >Contacto de emergencia</h5>
                                        </Alert> */}
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


                                {/* <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Formacion academica del alumno </h5>
                                        </Alert >
                                    </Row> */}
                                <div className="alert alert-info mt-2" role="alert">
                                    Formacion academica del alumno
                                </div>
                                <Row>
                                    <Col sm className="mt-3">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Nivel maximo de estudios</Form.Label>
                                            <Form.Select onChange={this.SeleccMaxEstudios}>
                                                <option>Seleccione una opcion</option>
                                                <option value="0">Basico</option>
                                                <option value="1">Medio Superior</option>
                                                <option value="2">Superior</option>
                                                <option value="3">Posgrado</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm className="mt-3">
                                        <Form.Group  className="mb-3">
                                            <Form.Label className="h5">Situacion academica</Form.Label>
                                            <Form.Select onChange={this.SeleccSituacionAcademina}>
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
                                            <Form.Label className="h5">Institucion educativa</Form.Label>
                                            <Form.Control type="text" placeholder="Institucion Educativa"  onChange={(evt) => this.dataForm0(evt, "InstitucionEducativa")} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group className="mb-3" >
                                            <Form.Label className="h5">Año de egreso</Form.Label>
                                            <Form.Control type="number"  onChange={(evt) => this.dataForm0(evt, "anioegreso")} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm className="mb-3">
                                        <Form.Group className="mb-3"  controlId="formFile3">
                                            <Form.Label className="h5">En caso de ser comunidad politecnica adjuntar evidencia</Form.Label>
                                            <Form.Control type="file" accept="image/*,.pdf" onChange={this.uploadFileEvidencia} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* <Row>
                                        <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                            <h5>Datos laborales</h5>
                                        </Alert >
                                    </Row> */}
                                <div className="alert alert-info mt-2" role="alert">
                                    Datos laborales
                                </div>
                                <Row>
                                    <Col sm>
                                        <Form.Group className="mb-3" >
                                            <Form.Label className="h5">Nombre de la institución</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre de la institución"  onChange={(evt) => this.dataForm0(evt, "laboralinstitucion")} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Domicilio</Form.Label>
                                            <Form.Control type="text" placeholder="Domicilio" onChange={(evt) => this.dataForm0(evt, "laboralDomicilio")}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm>
                                        <Form.Group className="mb-3" >
                                            <Form.Label className="h5">Puesto</Form.Label>
                                            <Form.Control type="text" placeholder="Puesto" onChange={(evt) => this.dataForm0(evt, "laboralPuesto")}/>
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Telefono</Form.Label>
                                            <Form.Control type="text" placeholder="Telefono" onChange={(evt) => this.dataForm0(evt, "laboralTelefono")} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* <Row>
                                    <Alert className="mt-2 " variant={"info"} style={{ color: '#00' }}>
                                        <h5>Información Adicional </h5>
                                    </Alert >
                                </Row> */}
                                <div className="alert alert-info mt-2" role="alert">
                                    Información Adicional 
                                </div>
                                <Row  >
                                    <Col sm>
                                        <Button className="col-12" variant="outline-primary" onClick={() => this.existeCurpAlum()}>
                                            <i className="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Agregar
                                        </Button>
                                    </Col>
                                    <Col sm >
                                        <Button className="col-12" variant="outline-danger" onClick={() => this.ShowForm(0)}>
                                            <i className="bi bi-plus-circle-fill "></i>
                                            &nbsp;&nbsp;Cancelar
                                        </Button>
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
                            <Row className="mt-3 mb-3">
                                <Col sm>
                                    <ButtonGroup aria-label="Basic example" >
                                        <Button variant="secondary" onClick={() => this.ShowForm(1)}>
                                            Nuevo servicio &nbsp;&nbsp;<i className="bi bi-plus-circle-fill "></i>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                                <Col >
                                    <input className='form-control' type="text" placeholder='Buscar' id="myInput" onChange={this.filterInput}></input>
                                </Col>

                            </Row>

                            {
                                informacion.length === 0 ?
                                    <Container className="mb-3"  >
                                        <div className="alert alert-danger mt-2" role="alert">
                                            No hay alumnos en la base de datos
                                        </div>
                                    </Container>
                                    : null
                            }
                            <div className="table-responsive " style={{ height: "500px" }}>
                                <Table className="table-hover" id="myTable" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Curp</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
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
                                                    <td >{index[2] + ' ' + index[3] + ' ' + index[4]}</td>
                                                    <td >{index[9]}</td>
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
                                                                    <i className="bi bi-pencil"></i> &nbsp;&nbsp;Editar
                                                                </Dropdown.Item>
                                                                <Dropdown.Divider />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="bi bi-cloud-download"></i>&nbsp;&nbsp;Download
                                                                <Dropdown.Divider />
                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1] , "fotografia")}                                                                >
                                                                    <i className="bi bi-images"></i>&nbsp;&nbsp;Fotografia
                                                                </Dropdown.Item>
                                                                
                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1] , "curp")}                                                                >
                                                                    <i className="bi bi-file-earmark-pdf"></i>&nbsp;&nbsp;Curp
                                                                </Dropdown.Item>

                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1] , "evidencia")}                                                                >
                                                                    <i className="bi bi-file-earmark-pdf"></i>&nbsp;&nbsp;Evidencia IPN
                                                                </Dropdown.Item>
                                                                <Dropdown.Item as={Link} to={`/PDFalumno/${index[1]}`} target="_blank" > 
                                                                    <i className="bi bi-cloud-download"></i>&nbsp;&nbsp;PDF
                                                                </Dropdown.Item>
                                                               
                                                               
                                                                {/* 
                                                                <Dropdown.Item onClick={() => this.closeOpenModal(1)}>
                                                                    <i className="bi bi-eye"></i> &nbsp;&nbsp;Ver
                                                                </Dropdown.Item> */}

                                                                {/* <Dropdown.Item 
                                                                    onClick={async () => {
                                                                        const res = await fetch('http://localhost:5000/api/downloadFile');
                                                                        const blob = await res.blob();
                                                                        download(blob, 'imagenDescarga.jpeg');
                                                                    }}
                                                                >
                                                                    <i className="bi bi-cloud-download"></i>&nbsp;&nbsp;Curp
                                                                </Dropdown.Item> */}
                                                                

                                                                {/* <Dropdown.Item as={Link} to="/PDFalumno" target="_blank" > <i className="bi bi-cloud-download"></i>&nbsp;&nbsp;PDf</Dropdown.Item> */}
                                                            
                                                            
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </Table>
                                {/* <button
                                    type="button"
                                    onClick={async () => {
                                        const res = await fetch('http://localhost:5000/api/downloadFile');
                                        const blob = await res.blob();
                                        download(blob, 'imagenDescarga.jpeg');
                                    }}
                                >
                                Download
                            </button> */}
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