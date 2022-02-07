import React from 'react'
import axios from 'axios'
import { Button, Form, Container, Row, Col, ButtonGroup, Table, Dropdown , CloseButton , OverlayTrigger , Tooltip } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import Moment from 'moment'
import NavbarMain from '../Components/NavbarS'
import PDFAlumno from './PDFalumno'
import $ from 'jquery';
import config from '../config/config.json';
import download from 'downloadjs';
import {StyleSheet } from '@react-pdf/renderer';


class FormularioC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            situacionAcademica: [
                "Estudiante (Cursando) ",
                "Pasante",
                "Titulado",
            ],
            MaxEstudiosOp: [
                "Basico",
                "Medio Superior",
                "Superior",
                "Posgrado"
            ],
            sistemaProcendencia: [
                "Colegio de Bachilleres del Estado de Oaxaca",
                "Colegio de Estudios Cientificos y Tecnológicos del Estado de Oaxaca",
                "Centro de Bachillerato Tecnologico Industrial y Servicios ",
                "Universidad Autónoma Benito Juárez de Oaxaca",
                "Preparatorias Abiertas de Oaxaca",
                "Otro"
            ],
            MedioInformacion: [
                "Cartel",
                "Radio",
                "Redes sociales:Facebook",
                "Página web",
                "Visita en lugar de trabajo",
                "Familiar/es o amigo/s",
                "Stand o feria",
                "Periódico",
                "Llamda telefonica",
                "Correo electronico",
                "En instalaciones del CVDR Unidad Oaxaca",
                "Egresado del CEC-CVDR-IPN",
                "Otro"
            ],
            informacion: [],
            data_form_uno: [],
            data_form_dos: [],
            //File load
            file_fotografia: null,
            fileCurp_Alumno: null,


            email_Alumno: "",
            curp_Alumno: "",
            genero: "",
            nombre_Alumno: "",
            appPat_Alumno: "",
            appMat_Alumno: "",
            fechaNac_Alumno: "",
            lugarNacimiento: "",
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


            //Datos laborales
            nombInstLaboral: "",
            domicilioLaboral: "",
            puesto: "",
            telefonoTra: "",

            //Formacion academica
            n_max_estudios: "",
            sitAcademico: "",
            instEducativa: "",
            anioEgresoi: "",
            fileEvideciaIPN: null,
            sistemaProcendenciaOpcion: "",
            sistemaProcendenciaOtro: "",
            UniversidadAspira: "",
            CarreraApira: "",


            //Acesso Vehicular 
            marca_modelo: "",
            placas: "",

            //Informacion Adicional
            comoseenterodelcurso: "",
            comoseenterodelcursoOtro: "",
            recomendacionCursoNombre: "",
            recomendacionCursoemail: "",
            recomendacionCursotelce: "",





            //Show formularios
            showForm: false,
            showTable: true,
            modalShow: false,
            showF_uno: true,
            showF_dos: false,
            showF_tres: false,
            showF_cuatro: false,

            //Validacion
            fileValCurp: false,
            fileValImg: false,
            fileValIpn: false,


            activateSend:false

        };
        //Funciones para el primero formulario
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.uploadFileCurp = this.uploadFileCurp.bind(this);
        this.SeleccGenero = this.SeleccGenero.bind(this);
        this.existeCurpAlum = this.existeCurpAlum.bind(this);
        this.SeleccMaxEstudios = this.SeleccMaxEstudios.bind(this);
        this.SeleccSituacionAcademina = this.SeleccSituacionAcademina.bind(this);
        this.SeleccSistemEducativo = this.SeleccSistemEducativo.bind(this);
        this.uploadFileEvidencia = this.uploadFileEvidencia.bind(this);
        this.dataoForm_cuatro = this.dataoForm_cuatro.bind(this);
        this.SeleccMedioInformacio = this.SeleccMedioInformacio.bind(this);
        this.form3Validacion = this.form3Validacion.bind(this);
        this.AceptoCheck = this.AceptoCheck.bind(this);
        this.filterInput = this.filterInput.bind(this);
        this.getDownloadFile = this.getDownloadFile.bind(this);
        
    }
    componentDidMount() {
        this.apiAlumnos();
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
    getDownloadFile  = async (curp , tipo) => {
        var formData = new FormData();
        formData.append('curp', curp);
        formData.append('tipo', tipo);
        const res = await fetch(
            config.general[0].url + config.general[0].puerto_api + "/api/downloadFile",
            {
                method: 'POST', // or 'PUT'
                body: formData, // data can be `string` or {object}!
            }
        )
        .catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: error.message,
            })
        });
        console.log(res);
        console.log(res.body);
        if(res.ok){
            const blob = await res.blob();
            // download(blob , 'dlText.jpeg' , "image/jpeg");
            download(blob );
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: "No se encontro el archivo",
            })
        }
    }
    apiAlumnos = async () => {
        try {
            const response = await fetch(config.general[0].url + config.general[0].puerto_api + "/api/Alumnos");
            var responseJson = await response.json();
            var temp = responseJson;
            if (temp['status'] == 200) {
                responseJson = responseJson['data']
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
                    arrayRow.push(responseJson[index]);

                    arrayInfo.push(arrayRow);
                }
                this.setState({ informacion: arrayInfo })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: temp['data'],
                })
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: e,
            })
        }
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
    dataForm_Uno(event, data) {
        switch (data) {
            case "email":
                this.setState({ email_Alumno: event.target.value });
                break;
            case "curp":
                this.setState({ curp_Alumno: event.target.value });
                break;
            case "nombre":
                this.setState({ nombre_Alumno: event.target.value });
                break;
            case "appPat":
                this.setState({ appPat_Alumno: event.target.value });
                break;
            case "appMat":
                this.setState({ appMat_Alumno: event.target.value });
                break;
            case "nacimiento":
                this.setState({ fechaNac_Alumno: event.target.value });
                break;
            case "lugarNacimiento":
                this.setState({ lugarNacimiento: event.target.value });
                break;
            case "telpar":
                this.setState({ telPar_Alumno: event.target.value });
                break;
            case "telcel":
                this.setState({ telCel_Alumno: event.target.value });
                break;
            case "calle":
                this.setState({ calle_Alumno: event.target.value });
                break;
            case "numero":
                this.setState({ num_Alumno: event.target.value });
                break;
            case "colonia":
                this.setState({ col_Alumno: event.target.value });
                break;
            case "cp":
                this.setState({ cp_Alumno: event.target.value });
                break;
            case "municipio":
                this.setState({ municipio_Alumno: event.target.value });
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "No se encuntra la opcion",
                })
        }
    }

    dataoFrm_Dos(event, data) {
        switch (data) {
            case "nombre_Emerge":
                this.setState({ nombre_Emerge: event.target.value });
                break;
            case "appPat_Emerge":
                this.setState({ appPat_Emerge: event.target.value });
                break;
            case "appMat_Emerge":
                this.setState({ appMat_Emerge: event.target.value });
                break;
            case "telContacto_Emerge":
                this.setState({ telContacto_Emerge: event.target.value });
                break;
            case "email_Emerge":
                this.setState({ email_Emerge: event.target.value });
                break;
            case "laboralinstitucion":
                this.setState({ nombInstLaboral: event.target.value });
                break;
            case "laboralDomicilio":
                this.setState({ domicilioLaboral: event.target.value });
                break;
            case "laboralPuesto":
                this.setState({ puesto: event.target.value });
                break;
            case "laboralTelefono":
                this.setState({ telefonoTra: event.target.value });
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "No se encuntra la opcion",
                })
        }
    }
    dataoForm_tres(event, data) {
        switch (data) {
            case "sistemaEducativoOtro":
                this.setState({ sistemaProcendenciaOtro: event.target.value });
                break;
            case "InstitucionEducativa":
                this.setState({ instEducativa: event.target.value });
                break;
            case "anioegreso":
                this.setState({ anioEgresoi: event.target.value });
                break;
            case "universidadAspira":
                this.setState({ UniversidadAspira: event.target.value });
                break;
            case "carreraAspiras":
                this.setState({ CarreraApira: event.target.value });
                break;

            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "No se encuntra la opcion",
                })
        }
    }
    dataoForm_cuatro(event, data) {
        switch (data) {
            case "marca_modelo":
                this.setState({ marca_modelo: event.target.value });
                break;
            case "Placas":
                this.setState({ placas: event.target.value });
                break;
            case "otro":
                this.setState({ comoseenterodelcursoOtro: event.target.value });
                break;
            case "nombre":
                this.setState({ recomendacionCursoNombre: event.target.value });
                break;
            case "email":
                this.setState({ recomendacionCursoemail: event.target.value });
                break;
            case "telcel":
                this.setState({ recomendacionCursotelce: event.target.value });
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "No se encuntra la opcion",
                })        }
    }
    uploadFileEvidencia(event) {
        var evidencia = event.target.value;
        if (evidencia === "") {
           this.setState({ fileValIpn: false});
        } else {
            this.setState({ fileEvideciaIPN: event.target.files[0] });
        }
    }
    uploadPhoto(event) {
        var photoUser = event.target.value;
        if (photoUser === "") {
            this.setState({ fileValImg: false });
        } else {
            this.setState({ fileValImg: true });
            this.setState({ file_fotografia: event.target.files[0] });
        }
    }
    uploadFileCurp(event) {
        var curp = event.target.value;

        if (curp === "") {
            this.setState({ fileValCurp: false });
        } else {
            this.setState({ fileValCurp: true });
            this.setState({ fileCurp_Alumno: event.target.files[0] });
        }
    }
    SeleccGenero(event) {
        this.setState({ genero: event.target.value });
    }
    SeleccMaxEstudios(event) {
        if (event.target.value !== "Seleccione una opcion") {
            this.setState({ n_max_estudios: event.target.value });
        }
    }
    SeleccSituacionAcademina(event) {
        if (event.target.value !== "Seleccione una opcion") {
            this.setState({ sitAcademico: event.target.value });
        }
    }
    SeleccSistemEducativo(event) {
        if (event.target.value !== "Seleccione una opcion") {
            this.setState({ sistemaProcendenciaOpcion: event.target.value });
        }
    }
    SeleccMedioInformacio(event) {
        if (event.target.value !== "Seleccione una opcion") {
            this.setState({ comoseenterodelcurso: event.target.value });
        }
    }
    AceptoCheck(event){
        var env = event.target.checked;
        this.setState({ activateSend: env});

        // activateSend
    }

    existeCurpAlum = async (pos) => {
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: error.message,
                })
            })
            if (respuesta === 0) {
                var campos = new Map();
                campos.set('Fotografia', this.state.file_fotografia);
                campos.set('email', this.state.email_Alumno);
                campos.set('Curp', this.state.curp_Alumno);
                campos.set('Archivo Curp ', this.state.fileCurp_Alumno);
                campos.set('Genero ', this.state.genero);
                campos.set('Nombre ', this.state.nombre_Alumno);
                campos.set('Apellido paterno ', this.state.appPat_Alumno);
                campos.set('Apellido Materno ', this.state.appMat_Alumno);
                campos.set('Fecha de nacimiento ', this.state.fechaNac_Alumno);
                campos.set('Lugar de nacimiento', this.state.lugarNacimiento);
                campos.set('Telefono celular', this.state.telCel_Alumno);
                campos.set('Calle', this.state.calle_Alumno);
                campos.set('Numero', this.state.num_Alumno);
                campos.set('Colonia', this.state.col_Alumno);
                campos.set('Codigo postal', this.state.cp_Alumno);
                campos.set('Municipio', this.state.municipio_Alumno);
                this.validarForm_Uno(campos, pos);
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
    fun_esEmail(correoElectronico){
        const esCorreoElectronico =/\S+@\S+/.test(correoElectronico);
        // const esCorreoElectronico =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correoElectronico);
        return esCorreoElectronico;
    }
    validarForm_Uno(mapData, pos) {
        let msg = "";
        for (let clave of mapData.keys()) {
            var valor = mapData.get(clave);
            if (valor === null || valor === "") {
                msg = `El campo :${clave} esta vacio`;
                break;
            }
        }
        if (msg === "") {
            var email = mapData.get('email');
            var esEmail = this.fun_esEmail(email);
            if (esEmail){
                this.ShowViewX(pos);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "El campo email no es valido Ejemplo :email@gmail.com",
                })
            }
        
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: msg,
            })
        }
    }
    ValidarForm_Dos(mapData, pos) {
        let msg = "";
        for (let clave of mapData.keys()) {
            var valor = mapData.get(clave);
            if (valor === null || valor === "") {
                msg = `El campo :${clave} esta vacio`;
                break;
            }
        }
        if (msg === "") {
            var email = mapData.get('email');
            var esEmail = this.fun_esEmail(email);
            if (esEmail){
                this.ShownextView(pos);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "El campo email no es valido Ejemplo :email@gmail.com",
                })
            }
        


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: msg,
            })
        }
    }
    form2Validacion(pos) {
        var campos = new Map();
        campos.set('Nombre ', this.state.nombre_Emerge);
        campos.set('Apellido paterno ', this.state.appPat_Emerge);
        campos.set('Apellido Materno ', this.state.appMat_Emerge);
        campos.set('Telefono celular', this.state.telContacto_Emerge);
        campos.set('email', this.state.email_Emerge);

        this.ValidarForm_Dos(campos, pos);
    }
    form3Validacion() {
        var campos = new Map();
        campos.set('Nombre ', this.state.recomendacionCursoNombre);
        campos.set('Email ', this.state.recomendacionCursoemail);
        campos.set('Telefono de Celular ', this.state.recomendacionCursotelce);
        this.dataMessage(campos);
    }
    dataMessage(mapData){
        let msg = "";
        for (let clave of mapData.keys()) {
            var valor = mapData.get(clave);
            if (valor === null || valor === "") {
                msg = `El campo :${clave} esta vacio`;
                break;
            }
        }
        if (msg === "") {
            var email = mapData.get('Email');
            var esEmail = this.fun_esEmail(email);
            if (esEmail){
                this.sendData();    
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: "El campo email no es valido Ejemplo :email@gmail.com",
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: msg,
            })
        }
    }
    sendData(){
        var url = config.general[0].url + config.general[0].puerto_api + "/Api/createRegistro";
        // var nacimiento = Moment(this.state.fechaNac_Alumno);
        // var hoy = Moment();
        // var anios = hoy.diff(nacimiento, "years");
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
        bodyFormData.append('telParticularAlum', this.state.telPar_Alumno);
        bodyFormData.append('telCelularAlum', this.state.telCel_Alumno);
        bodyFormData.append('lugarNacimiento', this.state.lugarNacimiento);
        
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

        
        //Datos laborales
        bodyFormData.append('nombreInst', this.state.nombInstLaboral);
        bodyFormData.append('domicilioInst', this.state.domicilioLaboral);
        bodyFormData.append('puestoInst', this.state.puesto);
        bodyFormData.append('telefonoInst', this.state.telefonoTra);


        //Formacion academica
        bodyFormData.append('nivMaxStudy', this.state.n_max_estudios);
        bodyFormData.append('acadSituacion', this.state.sitAcademico);
        bodyFormData.append('insEducativa', this.state.instEducativa);
        bodyFormData.append('anioEgreso', this.state.anioEgresoi);
        bodyFormData.append('fileEvidencia', this.state.fileEvideciaIPN);
        bodyFormData.append('SitemaEducativoProcedencia', this.state.sistemaProcendenciaOpcion);
        bodyFormData.append('SitemaEducativoProcedenciaOtro', this.state.sistemaProcendenciaOtro);
        bodyFormData.append('UniversidadAspira', this.state.UniversidadAspira);
        bodyFormData.append('CarreraAspira', this.state.CarreraApira);

        //Informacion Adicional
        bodyFormData.append('marca_modelo', this.state.marca_modelo);
        bodyFormData.append('placas', this.state.placas);
        bodyFormData.append('comoseenterodelcurso', this.state.comoseenterodelcurso);
        bodyFormData.append('comoseenterodelcursoOtro', this.state.comoseenterodelcursoOtro);
        bodyFormData.append('recomendacionCursoNombre', this.state.recomendacionCursoNombre);
        bodyFormData.append('recomendacionCursoemail', this.state.recomendacionCursoemail);
        bodyFormData.append('recomendacionCursotelce', this.state.recomendacionCursotelce);


        axios({
            method: 'POST',
            url: url,
            data: bodyFormData,
            // headers: {'content-type': 'multipart/form-data'}
            headers: { 'Content-Type': 'application/json' }

        }).then(function (response) {
            // console.log(response['data']);
            // console.log(response['status']);
            // console.log(response['data']['status']);
            // console.log(response['data']['data']);
            if(response['data']['status'] == 200){

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Alumno agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload(false);
                // this.setState({
                //     showForm: false,
                //     showTable: true,
                // });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: response['data']['data'] ,
                })
            }
        }).catch(function (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: e,
            })
        })


    }
    recolectamosData(){
        return 1;
    }
    ShowView(num) {
        this.setState({ fileValCurp: false });
        this.setState({ fileCurp_Alumno: null });
        this.setState({ fileValImg: false });
        this.setState({ file_fotografia: null });
        if (num === 0) {
            this.setState({
                showF_uno: true,
                showF_dos: false,
                showF_tres: false,
                showF_cuatro: false,

            });
        } else if (num === 1) {
            this.setState({
                showF_uno: false,
                showF_dos: true,
                showF_tres: false,
                showF_cuatro: false,
            });
        }
    }
    ShowViewX(num) {
        if (num === 0) {
            this.setState({
                showF_uno: true,
                showF_dos: false,
                showF_tres: false,
                showF_cuatro: false,

            });
        } else if (num === 1) {
            this.setState({
                showF_uno: false,
                showF_dos: true,
                showF_tres: false,
                showF_cuatro: false,
            });
        }
    }
    ShownextView(num) {
        if (num === 2) {
            this.setState({
                showF_uno: false,
                showF_dos: false,
                showF_tres: true,
                showF_cuatro: false,
            });
        } else if (num === 1) {
            this.setState({
                showF_uno: false,
                showF_dos: true,
                showF_tres: false,
                showF_cuatro: false,
            });
        } else if (num === 3) {
            this.setState({
                showF_uno: false,
                showF_dos: false,
                showF_tres: false,
                showF_cuatro: true,
            });
        }
    }

    render() {
        let { showForm } = this.state
        let { showTable } = this.state
        let { informacion } = this.state
        let { showF_uno } = this.state
        let { showF_dos } = this.state
        let { showF_tres } = this.state
        let { showF_cuatro } = this.state
        let { activateSend } = this.state
        let { data_form_uno } = this.state
        let { data_form_dos } = this.state

        let { MaxEstudiosOp } = this.state
        let { situacionAcademica } = this.state
        let { sistemaProcendencia } = this.state
        let { MedioInformacion } = this.state
        const styles = StyleSheet.create({
            buttonNext: {
                backgroundColor:" #ceac00 ",
                color:" #000",
                border: "none",
                height: 45
            },
            buttonPrevious:{
                backgroundColor:"#600101",
                color:" #FFF",
                border: "none",
                height: 45
            },
            buttonSend:{
                backgroundColor:"#00a01b ",
                color:" #000",
                border: "none",
                height: 45
            },
            buttonClose:{
                // backgroundColor:"#600101 ",
                color:"red",
                border: "none",
                height: 45
            }
        
        
        })

        return (
            <main >
                <header>
                    <NavbarMain />
                </header>
                {showForm ?

                    <section style={{ marginTop: 80 }} >
                        <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
                            <div >                               
                                 {/* <CloseButton style={styles.buttonClose} onClick={() => this.ShowForm(0)} /> */}
                                 {/* <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
                                    >
                                        {({ ref, ...triggerHandler }) => (
                                        <Button
                                            variant="light"
                                            {...triggerHandler}
                                            className="d-inline-flex align-items-center"
                                        >
                                            <Image
                                            ref={ref}
                                            roundedCircle
                                            src="holder.js/20x20?text=J&bg=28a745&fg=FFF"
                                            />
                                            <span className="ms-1">Hover to see</span>
                                        </Button>
                                        
                                        )}
                                    </OverlayTrigger>, */}
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
                                    >
                                    <CloseButton style={styles.buttonClose} onClick={() => window.location.reload(false)} />
                                        {/* <Button variant="success">Hover me to see</Button> */}
                                    </OverlayTrigger>
                            </div>

                            {
                                showF_uno ?
                                    <div>
                                        <Form>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Datos personales del participante
                                            </div>
                                            <Row className="mt-3">
                                                <Col sm >
                                                    <Form.Group controlId="formFile1" className="mb-3">
                                                        <Form.Label className="h6">Fotografía <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="file" accept="image/*" onChange={this.uploadPhoto} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm >
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Email <small style={{ color: "#600101" }}>*</small>  </Form.Label>
                                                        <Form.Control type="email" placeholder="Correo Electronico" value={this.state.email_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "email")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group >
                                                        <Form.Label className="h6">Curp <small style={{ color: "#600101" }}>*</small>  </Form.Label>
                                                        <Form.Control type="text" placeholder="Curp" value={this.state.curp_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "curp")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm >
                                                    <Form.Group controlId="formFile2" className="mb-3">
                                                        <Form.Label className="h6">Archivo de curp <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="file" accept=".pdf" onChange={this.uploadFileCurp} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group>
                                                        <Form.Label className="h6" >Genero <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        {/* <Select   options={this.state.options}  /> */}
                                                        <Form.Select aria-label="Default select example" onChange={this.SeleccGenero} value={this.state.genero}>
                                                            <option>Seleccione una opcion</option>
                                                            <option value="Mujer">Mujer</option>
                                                            <option value="Hombre">Hombre</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Nombre <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" value={this.state.nombre_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "nombre")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Apellido paterno <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Apellido paterno" value={this.state.appPat_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "appPat")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Apellido Materno <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Apellido Materno" value={this.state.appMat_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "appMat")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Fecha de nacimiento <small style={{ color: "#600101" }}>*</small>  </Form.Label>
                                                        <Form.Control type="date" value={this.state.fechaNac_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "nacimiento")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Lugar de nacimiento <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" value={this.state.lugarNacimiento} placeholder="Lugar de Nacimiento" min="0" max="300" onChange={(evt) => this.dataForm_Uno(evt, "lugarNacimiento")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Telefono particular </Form.Label>
                                                        <Form.Control type="tel" placeholder="Telefono particular" value={this.state.telPar_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "telpar")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Telefono celular <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="tel" placeholder="Telefono celular" value={this.state.telCel_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "telcel")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Domicilio
                                            </div>
                                            <Row >
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Calle <small style={{ color: "#600101" }}>*</small></Form.Label>
                                                        <Form.Control type="text" placeholder="Calle" value={this.state.calle_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "calle")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Numero <small style={{ color: "#600101" }}>*</small></Form.Label>
                                                        <Form.Control type="text" placeholder="Numero" min="0" value={this.state.num_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "numero")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Colonia <small style={{ color: "#600101" }}>*</small></Form.Label>
                                                        <Form.Control type="text" placeholder="Colonia" value={this.state.col_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "colonia")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Codigo postal <small style={{ color: "#600101" }}>*</small></Form.Label>
                                                        <Form.Control type="number" placeholder="Codigo postal" value={this.state.cp_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "cp")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Municipio <small style={{ color: "#600101" }}>*</small></Form.Label>
                                                        <Form.Control type="text" placeholder="Municipio" value={this.state.municipio_Alumno} onChange={(evt) => this.dataForm_Uno(evt, "municipio")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row  >
                                                <Col sm>
                                                    <Button className="col-6" style={styles.buttonNext} onClick={() => this.existeCurpAlum(1)}>
                                                        Siguiente &nbsp;<i className="bi bi-arrow-right-circle"></i>
                                                        
                                                    </Button>

                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    : null

                            }
                            {
                                showF_dos ?
                                    <div>
                                        <Form>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Contacto de emergencia
                                            </div>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Nombre <small style={{ color: "#600101" }}>*</small>  </Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" value={this.state.nombre_Emerge} onChange={(evt) => this.dataoFrm_Dos(evt, "nombre_Emerge")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Apellido paterno <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Apellido paterno" value={this.state.appPat_Emerge} onChange={(evt) => this.dataoFrm_Dos(evt, "appPat_Emerge")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Apellido Materno <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Apellido Materno" value={this.state.appMat_Emerge} onChange={(evt) => this.dataoFrm_Dos(evt, "appMat_Emerge")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Telefono de contacto <small style={{ color: "#600101" }}>*</small>  </Form.Label>
                                                        <Form.Control type="tel" placeholder="Telefono de contacto" value={this.state.telContacto_Emerge} onChange={(evt) => this.dataoFrm_Dos(evt, "telContacto_Emerge")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Email <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="email" placeholder="Correo Electronico" value={this.state.email_Emerge} onChange={(evt) => this.dataoFrm_Dos(evt, "email_Emerge")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Datos laborales
                                            </div>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Nombre de la institución</Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre de la institución" value={this.state.nombInstLaboral} onChange={(evt) => this.dataoFrm_Dos(evt, "laboralinstitucion")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Domicilio</Form.Label>
                                                        <Form.Control type="text" placeholder="Domicilio" value={this.state.domicilioLaboral} onChange={(evt) => this.dataoFrm_Dos(evt, "laboralDomicilio")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Puesto</Form.Label>
                                                        <Form.Control type="text" placeholder="Puesto" value={this.state.puesto} onChange={(evt) => this.dataoFrm_Dos(evt, "laboralPuesto")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Telefono</Form.Label>
                                                        <Form.Control type="text" placeholder="Telefono" value={this.state.telefonoTra} onChange={(evt) => this.dataoFrm_Dos(evt, "laboralTelefono")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row  >
                                                <Col sm>
                                                    <Button className="col-12" style={styles.buttonNext}  onClick={() => this.form2Validacion(2)}>
                                                        Siguiente &nbsp;<i className="bi bi-arrow-right-circle"></i>
                                                    </Button>
                                                </Col>
                                                <Col sm >
                                                    <Button className="col-12" style={styles.buttonPrevious} onClick={() => this.ShowView(0)}>
                                                        
                                                        <i className="bi bi-arrow-left-circle"></i> &nbsp; Anterior 

                                                    </Button>
                                                </Col>
                                            </Row>

                                        </Form>

                                    </div>
                                    : null

                            }
                            {
                                showF_tres ?
                                    <div>
                                        <Form>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Formacion academica del alumno
                                            </div>
                                            <Row>
                                                <Col sm className="mt-3">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Nivel maximo de estudios</Form.Label>
                                                        <Form.Select onChange={this.SeleccMaxEstudios} value={this.state.n_max_estudios}> 
                                                            <option>Seleccione una opcion</option>

                                                            {
                                                                MaxEstudiosOp.map((index) =>
                                                                    <option value={index} key={index}>{index}</option>
                                                                )
                                                            }

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm className="mt-3">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Situacion academica</Form.Label>
                                                        <Form.Select onChange={this.SeleccSituacionAcademina} value={this.state.sitAcademico}>
                                                            <option>Seleccione una opcion</option>

                                                            {
                                                                situacionAcademica.map((index) =>
                                                                    <option value={index} key={index}>{index}</option>
                                                                )
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm >
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Sistema educativo de la Institución de procedencia</Form.Label>
                                                        <Form.Select onChange={this.SeleccSistemEducativo} value={this.state.sistemaProcendenciaOpcion}>
                                                            <option>Seleccione una opcion</option>

                                                            {
                                                                sistemaProcendencia.map((index) =>
                                                                    <option value={index} key={index}>{index}</option>
                                                                )
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Otro </Form.Label>
                                                        <Form.Control type="text" placeholder="Otro"  value={this.state.sistemaProcendenciaOtro}  onChange={(evt) => this.dataoForm_tres(evt, "sistemaEducativoOtro")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Institucion educativa de procedencia  </Form.Label>
                                                        <Form.Control type="text" placeholder="Institucion Educativa" value={this.state.instEducativa} onChange={(evt) => this.dataoForm_tres(evt, "InstitucionEducativa")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Año de egreso</Form.Label>
                                                        <Form.Control type="number"  value={this.state.anioEgresoi} onChange={(evt) => this.dataoForm_tres(evt, "anioegreso")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm className="mb-3">
                                                    <Form.Group className="mb-3" controlId="formFile3">
                                                        <Form.Label className="h6">En caso de ser comunidad politecnica adjuntar evidencia</Form.Label>
                                                        <Form.Control type="file" accept="image/*,.pdf" onChange={this.uploadFileEvidencia} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Universidad a la que aspiras ingresar</Form.Label>
                                                        <Form.Control type="text" placeholder="Institucion Educativa"  value={this.state.UniversidadAspira}  onChange={(evt) => this.dataoForm_tres(evt, "universidadAspira")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Carrera a la que aspiras ingresar </Form.Label>
                                                        <Form.Control type="text"   placeholder="Carrera a la que aspiras ingresar" value={this.state.CarreraApira} onChange={(evt) => this.dataoForm_tres(evt, "carreraAspiras")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form>

                                        <Row  >
                                            <Col sm>
                                                <Button className="col-12" style={styles.buttonNext}  onClick={() => this.ShownextView(3)}>
                                                    Siguiente &nbsp;<i className="bi bi-arrow-right-circle"></i>

                                                    
                                                </Button>
                                            </Col>
                                            <Col sm >
                                                <Button className="col-12"  style={styles.buttonPrevious}  onClick={() => this.ShownextView(1)}>
                                                    <i className="bi bi-arrow-left-circle"></i> &nbsp; Anterior 

                                                    
                                                </Button>
                                            </Col>
                                        </Row>

                                    </div>

                                    : null
                            }
                            {
                                showF_cuatro ?
                                    <div>
                                        <Form>
            
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Acceso vehicular
                                            </div>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Marca y Modelo</Form.Label>
                                                        <Form.Control type="text" placeholder="Marca y Modelo"  value={this.state.marca_modelo}  onChange={(evt) => this.dataoForm_cuatro(evt, "marca_modelo")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Placas</Form.Label>
                                                        <Form.Control type="text" placeholder="Placas" value={this.state.placas}   onChange={(evt) => this.dataoForm_cuatro(evt, "Placas")} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                Información Adicional
                                            </div>
                                            <Row>
                                                <Col sm>
            
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">¿Cómo se enteró del curso? *</Form.Label>
                                                        <Form.Select onChange={this.SeleccMedioInformacio}  value={this.state.comoseenterodelcurso} >
                                                            <option>Seleccione una opcion</option>
            
                                                            {
                                                                MedioInformacion.map((index) =>
                                                                    <option value={index} key={index}>{index}</option>
                                                                )
                                                            }
            
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">En caso de seleccionar "Otro" ¿Cómo fue?</Form.Label>
                                                        <Form.Control type="text" placeholder="Otro" value={this.state.comoseenterodelcursoOtro}   onChange={(evt) => this.dataoForm_cuatro(evt, "otro")} />
                                                    </Form.Group>
                                                </Col>
            
                                            </Row>
                                            <div className="alert mt-2" role="alert" style={{ background: ' #ceac00', color: '#000' }}>
                                                ¿A quién recomendaría este curso?
                                            </div>
                                            <Row>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">Nombre <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" value={this.state.recomendacionCursoNombre} onChange={(evt) => this.dataoForm_cuatro(evt, "nombre")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label className="h6">Email <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="email" placeholder="Correo Electronico" value={this.state.recomendacionCursoemail} onChange={(evt) => this.dataoForm_cuatro(evt, "email")} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="h6">TelefonoCelular <small style={{ color: "#600101" }}>*</small> </Form.Label>
                                                        <Form.Control type="text" placeholder="Telefono de celular" value={this.state.recomendacionCursotelce} onChange={(evt) => this.dataoForm_cuatro(evt, "telcel")} />
                                                    </Form.Group>
                                                </Col>
            
                                            </Row>
                                            <div className="alert alert-danger  mt-2 " role="alert" >
                                            <h2>
                                                ¡Importante!
                                            </h2>
                                            {"\n"}
                                                El Centro de Vinculación y Desarrollo Regional Unidad Oaxaca se reserva el derecho de cancelar o posponer el programa 
                                                académico si no se cumple con el mínimo de participantes a la fecha de inicio del programa. 
                                            </div>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Si , acepto"  onChange={this.AceptoCheck}   />
                                            </Form.Group>
                                            <Row  >
                                                <Col sm>
                                                    <Button className="col-12" style={styles.buttonPrevious}  onClick={() => this.ShownextView(2)}>
                                                        
                                                    <i className="bi bi-arrow-left-circle"></i> &nbsp; Anterior 

                                                    
                                                    </Button>
                                                </Col>
                                                <Col sm >
                                                    {  activateSend ? 
                                                            <Button className="col-12" style={styles.buttonSend} onClick={ () => this.form3Validacion() }>Enviar</Button>
                                                        
                                                        :
                                                            <Button className="col-12" style={styles.buttonSend} disabled>Enviar</Button>                                            
                                                    }
                                                </Col>
                                            </Row>

                                        </Form>
                                    </div>
            
                                    : null
                            }
                        </Container>
                    </section>
                    : null

                }
                {showTable ?

                    <section style={{ marginTop: 80 }} >
                        <section>
                            <Container className="mt-3 mb-3">
                            </Container>
                        </section>
                        <Container className="border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2" >
                            <Row className="mt-3 mb-3"   >
                                <Col sm >
                                    <ButtonGroup aria-label="Basic example"  >
                                        <Button variant="secondary" onClick={() => this.ShowForm(1)}>
                                            Registrar &nbsp;&nbsp;<i className="bi bi-plus-circle-fill "></i>
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
                                            informacion.map((index) =>
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
                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1], 0)}                                                                >
                                                                    <i className="bi bi-images"></i>&nbsp;&nbsp;Fotografia
                                                                </Dropdown.Item>

                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1], 1)}                                                                >
                                                                    <i className="bi bi-file-earmark-pdf"></i>&nbsp;&nbsp;Curp
                                                                </Dropdown.Item>

                                                                <Dropdown.Item onClick={() => this.getDownloadFile(index[1], 2)}                                                                >
                                                                    <i className="bi bi-file-earmark-pdf"></i>&nbsp;&nbsp;Evidencia IPN
                                                                </Dropdown.Item>
                                                                <Dropdown.Item as={Link} to={`/PDFalumno/${index[1]}`} target="_blank" >
                                                                    <i className="bi bi-cloud-download"></i>&nbsp;&nbsp;PDF
                                                                </Dropdown.Item>


                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            )
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