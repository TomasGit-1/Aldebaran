const { Pool } = require('pg');
const fileUpload = require('express-fileupload');
const multer = require('multer')
// const upload = multer({ dest: './resource/data/' })

var fs = require('fs');
let json = require('../config/configApi.json');
// const { use } = require('../routes/index.routes');

let rutas = json['rutas'];
let conexion = json['postgresql'];
const config = {
    host: conexion[0]['host'],
    user: conexion[0]['user'],
    password: conexion[0]['password'],
    database: conexion[0]['database'],
    port: conexion[0]['port'],
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

const Home = async () => {
    return 200;
};
const getServicios = async () => {
    const response = await pool.query('SELECT * FROM SERVICIOEDUCATIVO ORDER BY idServiciosEdu DESC');
    var data = response.rows;
    let id = []
    let registro = []
    let evento = []
    let programaAcademico = []
    let habilitado = []
    let modalidad = []
    let cuota = []
    let numModulo = []
    let numHoras = []
    data.map(row => {
        id.push(row['idserviciosedu']);
        registro.push(row['registro_academico']);
        evento.push(row['tipo_evento']);
        programaAcademico.push(row['programa_academico']);
        habilitado.push(String(row['habilitado']));
        modalidad.push(row['modalidad']);
        cuota.push(row['cuota']);
        numModulo.push(row['nummodulo']);
        numHoras.push(row['numhoras']);
    })
    return { "id": id, "registro": registro, "evento": evento, "programaAcademico": programaAcademico, "habilitado": habilitado, "modalidad": modalidad, "cuota": cuota, "numModulo": numModulo, "numHoras": numHoras };
};
const getAlumnos = async () => {
    const response = await pool.query('SELECT * FROM personas  ORDER BY idPersona DESC');
    var data = response.rows;
    var bdAlumnos = []
    for (let index = 0; index < data.length; index++) {
        bdAlumnos.push(data[index]);
    }
    return { "Info": bdAlumnos };
};
const updateHabilitado = async (req) => {
    let datos = req.body;
    let id = datos.data.id;
    let newhabilitadp = datos.data.habilitado;
    const response = await pool.query('UPDATE SERVICIOEDUCATIVO SET habilitado = $1   WHERE idServiciosEdu = $2', [
        newhabilitadp,
        id,
    ]);
    return { "mensaje": 'User Updated Successfully' };
};
const getCurp = async (req) => {
    let datos = req.body;
    let curp = datos.validacion.curpAlum;
    const response = await pool.query('SELECT * FROM personas WHERE curp = $1', [curp]);
    if (response.rowCount == 0) {
        return 0
    } else {
        return 1
    }
};

const createServicio = async (req) => {
    let datos = req.body;
    let registroAcade = datos.validacion.registro;
    let evento = datos.validacion.evento;
    let nombreAcademico = datos.validacion.nombre;
    let modalidad = datos.validacion.modalidad;
    let cuota = datos.validacion.cuota;
    let numModulo = datos.validacion.numModulo;
    let numHoras = datos.validacion.numHoras;
    const response = await pool.query('INSERT INTO servicioeducativo  (registro_academico , tipo_evento , programa_academico ,modalidad , cuota , habilitado , nummodulo , numHoras) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8)', [registroAcade, evento, nombreAcademico, modalidad, cuota, 1, numModulo, numHoras]);
    return { "mensaje": 'Servicio agregado' };
};


const createIngreso = async (personas, emergencia, datoslaborales, filespath, formacionAcademica, InfoAdicional) => {
    const persona = await pool.query('INSERT INTO personas  (Curp , email, Nombre , AppPat ,AppMat  , Sexo ,  FechaNacimiento  , TelPar , TelCel , Calle , Colonia , CodigoPostal ,Municipio , numDomicilio ,lugarNacimiento ) VALUES ($1, $2 , $3 , $4 , $5 , $6 ,$7 , $8 , $9 , $10 , $11 , $12 , $13 , $14, $15)',
        [
            personas[0],
            personas[1],
            personas[2],
            personas[3],
            personas[4],
            personas[5],
            personas[6],
            personas[7],
            personas[8],
            personas[9],
            personas[10],
            personas[11],
            personas[12],
            personas[13],
            personas[14],
        ]);

    const files = await pool.query('INSERT INTO FilesPersona  (idcurpfk , FotografiaImg , CurpPdf ,EvidenciaipnPdf) VALUES ($1, $2 , $3 , $4 )',
        [
            personas[0], filespath[0], filespath[1], filespath[2]
        ]
    );

    const contacto = await pool.query('INSERT INTO contactoemergencia  (idcurpfk , Nombre , AppPat ,AppMat , telefono_contacto ,email) VALUES ($1, $2 , $3 , $4 , $5 , $6 )',
        [
            personas[0], emergencia[0], emergencia[1], emergencia[2], emergencia[3], emergencia[4]
        ]);


    const formacion = await pool.query('INSERT INTO formacionacademica  (idcurpfk , n_max_estudios , s_academica_actual ,sistemaeducativoprocedencia,sistemaeducativoprocedenciaOtro , insteducativa , anioegreso , uniAspiraIngresar , carrerarAspirasIngresar) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 )',
        [
            personas[0], formacionAcademica[0], formacionAcademica[1], formacionAcademica[2], formacionAcademica[3], formacionAcademica[4], formacionAcademica[5], formacionAcademica[6], formacionAcademica[7]
        ]
    );
    const datoslabo = await pool.query('INSERT INTO datoslaborales  (idcurpfk , nombre_institucion , direccion ,puesto , telefono) VALUES ($1, $2 , $3 , $4 , $5 )',
        [
            personas[0], datoslaborales[0], datoslaborales[1], datoslaborales[2], datoslaborales[3]
        ]
    );
    const infoAdic = await pool.query('INSERT INTO infoadicional (idcurpfk , marca_modelo_Vehiculo , placas_Vehiculo ,comoseenterodelcuros , comoseenterodelcurosOtro , recomendacion_Nombre , recomendacion_Email ,recomendacion_telCel ) VALUES ($1, $2 , $3 , $4 , $5 ,$6 , $7 , $8 )',
        [
            personas[0], InfoAdicional[0], InfoAdicional[1], InfoAdicional[2], InfoAdicional[3], InfoAdicional[4], InfoAdicional[5], InfoAdicional[6]
        ]
    );


    return { "mensaje": 'Servicio agregado' };
}
const getPathFile = async (data) => {
    var curp = data;
    const response = await pool.query('SELECT * FROM filespersona WHERE idcurpfk = $1', [curp]);
    return { "Info": response.rows };
};
const getDataUsers = async (curp) => {
    var curp = curp;
    // const response = await pool.query('SELECT * FROM personas FULL JOIN formacionacademica ON personas.curp = formacionacademica.idcurpfk FULL JOIN filespersona ON  personas.curp =  filespersona.idcurpfk FULL JOIN datoslaborales ON personas.curp = datoslaborales.idcurpfk FULL JOIN contactoemergencia ON personas.curp = contactoemergencia.idcurpfk WHERE personas.curp = $1',[curp]);
    const response0 = await pool.query('SELECT * FROM personas WHERE curp = $1', [curp]);
    var data_persona = response0.rows;

    const response1 = await pool.query('SELECT * FROM contactoemergencia WHERE idcurpfk = $1', [curp]);
    var data_contacto = response1.rows;

    const response2 = await pool.query('SELECT * FROM formacionacademica WHERE idcurpfk = $1', [curp]);
    var data_formacionacademicia = response2.rows;

    const response3 = await pool.query('SELECT * FROM datoslaborales WHERE idcurpfk = $1', [curp]);
    var data_laborales = response3.rows;

    const response4 = await pool.query('SELECT * FROM INFOADICIONAL WHERE idcurpfk = $1', [curp]);
    var data_infoAdicional = response4.rows;

    var data_Full = [data_persona, data_contacto, data_formacionacademicia, data_laborales, data_infoAdicional]

    return {
        "data": data_Full
    }
}
const getPagos = async () => {
    // const response = await pool.query('SELECT * FROM pagos  ORDER BY idpagos DESC');
    var querySQL = 'SELECT * FROM pagos INNER JOIN ServicioEducativo ON   pagos.idserviciosedufk = ServicioEducativo.idserviciosedu ORDER BY idpagos DESC;';
    const response = await pool.query(querySQL);

    var data = response.rows;
    var bdPagos = []
    for (let index = 0; index < data.length; index++) {
        bdPagos.push(data[index]);
    }
    return { "Info": bdPagos };
};

const getDataServicios = async () => {
    // const response = await pool.query('SELECT * FROM pagos  ORDER BY idpagos DESC');
    var querySQL = 'SELECT * FROM SERVICIOEDUCATIVO ORDER BY idServiciosEdu DESC';

    // var querySQL ='SELECT * FROM pagos INNER JOIN ServicioEducativo ON   pagos.idserviciosedufk = ServicioEducativo.idserviciosedu ORDER BY idpagos DESC;';
    const response = await pool.query(querySQL);

    var data = response.rows;
    var bdServicios = []
    for (let index = 0; index < data.length; index++) {
        bdServicios.push(data[index]);
    }

    const responsePersona = await pool.query('SELECT * FROM personas  ORDER BY idPersona DESC');
    data = responsePersona.rows;
    var bdAlumnos = []
    for (let index = 0; index < data.length; index++) {
        var array = [];
        array.push(data[index].curp);
        array.push(data[index].nombre + " " + data[index].apppat + " " + data[index].appmat);
        bdAlumnos.push(array);
    }

    const responseiniciocursos = await pool.query('SELECT * FROM iniciocursos  ORDER BY idInicioCurso DESC');
    data = responseiniciocursos.rows;

    return { "Info": bdServicios, "Curp": bdAlumnos , "Cursos" : data };
};


const setCrearPago = async (data) => {
    var nowDateTime = Date.now();
    var dat = new Date(); //Obtienes la fecha
    var dat2 = Date.parse(dat); //Lo parseas para transformarlo

    // var str = data[12].replace('/', '-');
    // str = str.replace('/', '-');
    
    // var mydate = new Date(str);
    // console.log(mydate.toDateString());
    if (data[8] === '') {
        const contacto = await pool.query('INSERT INTO pagos  (idcurpfk , idServiciosEduFk , numModulo ,comprobantePath , cedulaPath ,referencia , cantidad, FechaHoraTicket ,facturacion ,fechaHoraRegistro , descripcion , FECHA_INICIO_OPCIONAL) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 )',
            [
                data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7],data[10], dat, data[11] ,  data[12]
            ]);
    }else{
        const contacto = await pool.query('INSERT INTO pagos  (idcurpfk , idServiciosEduFk , numModulo ,comprobantePath , cedulaPath ,referencia , cantidad, FechaHoraTicket , FECHA_INICIO , FECHA_TERMINO ,facturacion ,fechaHoraRegistro , descripcion ) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 )',
            [
                data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], dat, data[11]
            ]);
    }


    return { "mensaje": 'Pago registrado' };
}

getDataServicioPDF = async (idServicio) => {
    var idServicio = idServicio;
    const resp = await pool.query('SELECT * FROM SERVICIOEDUCATIVO WHERE idServiciosEdu = $1', [idServicio]);
    var data = resp.rows;
    return {
        "data": data
    }
}

getDataPagosPDF = async (idPagos) => {
    var idPagos = idPagos;
    const resp = await pool.query('SELECT * FROM pagos WHERE idPagos = $1', [idPagos]);
    var dataPagos = resp.rows;

    var curpAlum = dataPagos[0].idcurpfk;
    const respAlu = await pool.query('SELECT * FROM Personas WHERE Curp = $1', [curpAlum]);
    var dataAlum = respAlu.rows;

    var servicioEduc = dataPagos[0].idserviciosedufk;
    const respServicio = await pool.query('SELECT * FROM SERVICIOEDUCATIVO WHERE idServiciosEdu = $1', [servicioEduc]);
    var dataServicio = respServicio.rows;


    return {
        "pago": dataPagos,
        "alumno": dataAlum,
        "servicio": dataServicio

    }
}

const getPathPagos = async (data) => {
    var idPagos = data;
    const response = await pool.query('SELECT * FROM pagos WHERE idPagos = $1', [idPagos]);
    return { "Info": response.rows };
};

const UpdateServicio = async (req) => {
    let datos = req.body;
    var idServicio = datos.validacion.idServicio;
    let registroAcade = datos.validacion.registro;
    let evento = datos.validacion.evento;
    let nombreAcademico = datos.validacion.nombre;
    let modalidad = datos.validacion.modalidad;
    let cuota = datos.validacion.cuota;
    let numModulo = datos.validacion.numModulo;
    let numHoras = datos.validacion.numHoras;
    const response = await pool.query('UPDATE servicioeducativo SET  registro_academico = $1 , tipo_evento = $2 , programa_academico = $3 , modalidad = $4 , cuota = $5 , nummodulo  = $6 , numHoras = $7  WHERE idServiciosEdu = $8', [registroAcade, evento, nombreAcademico, modalidad, cuota, numModulo, numHoras, idServicio]);
    return { "mensaje": 'Servicio actualizado' };
};

const UpdatePagos = async (query, data , newCampo , idPagos) => {

    const response = await pool.query(query, data);
    const response2 = await pool.query('UPDATE pagos SET FECHA_INICIO_OPCIONAL = $1  WHERE idPagos = $2', [newCampo ,idPagos ]);

    // console.log(response);
    return { "mensaje": 'Pago actualizado' };
};

const UpdateRegistro = async (personas, emergencia, datoslaborales, filespath, formacionAcademica, InfoAdicional , sendFiles) => {
    let query = "";
    //Query para actualizar la tabla persona
    let dataPersona = [];
    dataPersona =[
        personas[1],
        personas[2],
        personas[3],
        personas[4],
        personas[5],
        personas[6],
        personas[7],
        personas[8],
        personas[9],
        personas[10],
        personas[11],
        personas[12],
        personas[13],
        personas[14],
        personas[0],

    ];

    query = "UPDATE personas SET email = $1 , Nombre = $2 , AppPat = $3 , AppMat = $4 , Sexo = $5 , FechaNacimiento = $6 , TelPar = $7 , TelCel = $8 , Calle = $9 , Colonia = $10 , CodigoPostal = $11 , Municipio = $12 , numDomicilio = $13 , lugarNacimiento = $14 WHERE Curp = $15"
        const resPersona = await pool.query(query , dataPersona);
    
    //Query para actualizar la tabla contacto de emergencia
    query = "UPDATE contactoemergencia SET Nombre = $1 , AppPat = $2 , AppMat = $3 , telefono_contacto = $4 , email = $5 WHERE idcurpfk = $6";

    let dataContactEmergencia = [
         emergencia[0], emergencia[1], emergencia[2], emergencia[3], emergencia[4] , personas[0]
    ];

    const resContactoEmergencia= await pool.query(query , dataContactEmergencia);

    //Query para actualizar la tabla formacionacademic1
    query = "UPDATE formacionacademica SET n_max_estudios = $1 , s_academica_actual = $2 , sistemaeducativoprocedencia = $3 , sistemaeducativoprocedenciaOtro = $4 , insteducativa = $5 , anioegreso = $6 , uniAspiraIngresar = $7 , carrerarAspirasIngresar = $8 WHERE idcurpfk = $9";

    let dataFormacionAcadmeica = [
       formacionAcademica[0], formacionAcademica[1], formacionAcademica[2], formacionAcademica[3], formacionAcademica[4], formacionAcademica[5], formacionAcademica[6], formacionAcademica[7] ,  personas[0]

    ];
    const resFormacionAcademica = await pool.query(query , dataFormacionAcadmeica);

    //Query para datos laborales tabla
    query = "UPDATE datoslaborales SET nombre_institucion = $1, direccion = $2, puesto = $3, telefono = $4  WHERE idcurpfk = $5" 
    let dataLaboral = [
        datoslaborales[0], datoslaborales[1], datoslaborales[2], datoslaborales[3] , personas[0]
    ];
    const resLaboral = await pool.query(query , dataLaboral);

    //Query para actualizar la tabla de infomacion adicional
    query = "UPDATE infoadicional SET marca_modelo_Vehiculo = $1 , placas_Vehiculo = $2 , comoseenterodelcuros = $3 , comoseenterodelcurosOtro = $4 , recomendacion_Nombre = $5 , recomendacion_Email= $6 , recomendacion_telCel = $7 WHERE idcurpfk = $8";

    let dataInfoAdicional = [
       InfoAdicional[0], InfoAdicional[1], InfoAdicional[2], InfoAdicional[3], InfoAdicional[4], InfoAdicional[5], InfoAdicional[6] ,   personas[0]
    ];

    if (sendFiles){
        const resLaboral = await pool.query(filespath[0] , filespath[1]);
    }


    return { "mensaje": 'Datos actualizados' };
};


const createInicioCurso = async (req) => {
    let datos = req.body;
    let servicioID = datos.idServicioEducativo;
    let servicioName = datos.ServicioEducativo;
    let dateInicion = datos.dateInicio;
    const response = await pool.query('INSERT INTO iniciocursos  (idServiciosEduFK , fecha_inicio , habilitado_curso) VALUES ($1, $2 , $3)', [servicioID, dateInicion,1]);
    return { "mensaje": 'Servicio agregado' };
};


const getInicioCurso = async () => {
    const response = await pool.query('SELECT * FROM iniciocursos INNER JOIN servicioeducativo ON  iniciocursos.idServiciosEduFK = servicioeducativo.idServiciosEdu ORDER BY idInicioCurso DESC;');
    // s  FULL JOIN servicioeducativo ON  iniciocursos.idServiciosEduFK = servicioeducativo.idServiciosEdu ORDER BY idInicioCurso DESC 
    var data = response.rows;
    var bdFechaCursos = []
    for (let index = 0; index < data.length; index++) {
        bdFechaCursos.push(data[index]);
    }
    return { "Info": bdFechaCursos };
};
const updateHabilitadoFechasBD = async (req) => {
    let datos = req.body;
    let id = datos.data[0];
    let newhabilitado = ( (datos.data[4] === "Habilitado") ? false : true);
    const response = await pool.query('UPDATE iniciocursos SET habilitado_curso = $1   WHERE idInicioCurso = $2', [
        newhabilitado,
        id,
    ]);
    return { "mensaje": 'User Updated Successfully' };
};


getDataFechaEdit = async (idFecha) => {
    var idFecha = idFecha;
    const resp = await pool.query('SELECT * FROM iniciocursos WHERE idInicioCurso = $1', [idFecha]);
    var dataFechas = resp.rows;
    return {
        "data": dataFechas,
    }
}

UpdateFecha = async (req) => {
    let datos = req.body;
    let servicioID = datos.idServicioEducativo;
    let servicioName = datos.ServicioEducativo;
    let dateInicion = datos.dateInicio;
    let idCurso = datos.idCurso;
    const response = await pool.query('UPDATE iniciocursos SET  idServiciosEduFK = $1 , fecha_inicio = $2  WHERE idInicioCurso = $3', [servicioID, dateInicion , idCurso]);
    return { "mensaje": 'Datos actualizados' };
}

module.exports = {
    Home,
    getServicios,
    getAlumnos,
    updateHabilitado,
    getCurp,
    createServicio,
    createIngreso,
    getPathFile,
    getDataUsers,
    getPagos,
    getDataServicios,
    setCrearPago,
    getDataServicioPDF,
    getDataPagosPDF,
    UpdateServicio,
    getPathPagos,
    UpdatePagos,
    UpdateRegistro,
    createInicioCurso,
    getInicioCurso,
    updateHabilitadoFechasBD,
    getDataFechaEdit,
    UpdateFecha
};
