const { Pool } = require('pg');
const fileUpload = require('express-fileupload');
const multer  = require('multer')
// const upload = multer({ dest: './resource/data/' })

var fs = require('fs');
let json = require('../config/configApi.json');
// const { use } = require('../routes/index.routes');

let rutas = json['rutas'];
let conexion = json['postgresql'];
const config = {
    host:conexion[0]['host'],
    user:conexion[0]['user'],
    password:conexion[0]['password'],
    database:conexion[0]['database'],
    port:conexion[0]['port'],
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

const Home = async () =>{
    // console.log("Hola Bd");
    return 200;
};
const getServicios = async () => {
    const response = await pool.query('SELECT * FROM SERVICIOEDUCATIVO ORDER BY idServiciosEdu DESC');
    var data = response.rows;
    let id =[]
    let registro = []
    let evento = []
    let programaAcademico =[]
    let habilitado =[]
    let modalidad =[]
    let cuota =[]
    let numModulo =[]
    let numHoras =[]
    data.map(row =>{
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
    return {"id":id, "registro":registro , "evento":evento , "programaAcademico":programaAcademico, "habilitado":habilitado , "modalidad":modalidad,"cuota":cuota , "numModulo":numModulo , "numHoras":numHoras  };
};
const getAlumnos = async () => {
    const response = await pool.query('SELECT * FROM personas  ORDER BY idPersona ASC');
    var data = response.rows;
    var bdAlumnos = []
    for (let index = 0; index < data.length; index++) {
        bdAlumnos.push(data[index]);
    }
    return {"Info":bdAlumnos};
};
const updateHabilitado = async (req) => {
    let datos = req.body;
    let id = datos.data.id;
    let newhabilitadp = datos.data.habilitado;
    const response =await pool.query('UPDATE SERVICIOEDUCATIVO SET habilitado = $1   WHERE idServiciosEdu = $2', [
        newhabilitadp,
        id,
    ]);
    return {"mensaje" :'User Updated Successfully'};
};
const getCurp = async (req)  => {
    let datos = req.body;
    let curp = datos.validacion.curpAlum;
    const response = await pool.query('SELECT * FROM personas WHERE curp = $1' ,[curp]);
    if(response.rowCount == 0){
        return 0
    }else{
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
    const response = await pool.query('INSERT INTO servicioeducativo  (registro_academico , tipo_evento , programa_academico ,modalidad , cuota , habilitado , nummodulo , numHoras) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8)', [registroAcade,evento,nombreAcademico, modalidad ,cuota, 1 ,numModulo , numHoras]);
    console.log(response);
    return {"mensaje" :'Servicio agregado'};
};


const createIngreso = async (personas , emergencia , datoslaborales , filespath , formacionAcademica , InfoAdicional  ) => {
    console.log("Empezamos a guardar la informacion")
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
            personas[0],filespath[0],filespath[1],filespath[2]
        ]
    );

    const contacto = await pool.query('INSERT INTO contactoemergencia  (idcurpfk , Nombre , AppPat ,AppMat , telefono_contacto ,email) VALUES ($1, $2 , $3 , $4 , $5 , $6 )',
    [   
        personas[0],emergencia[0],emergencia[1],emergencia[2],emergencia[3],emergencia[4]
    ]);


    const formacion = await pool.query('INSERT INTO formacionacademica  (idcurpfk , n_max_estudios , s_academica_actual ,sistemaeducativoprocedencia,sistemaeducativoprocedenciaOtro , insteducativa , anioegreso , uniAspiraIngresar , carrerarAspirasIngresar) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 )',
        [   
            personas[0],formacionAcademica[0],formacionAcademica[1],formacionAcademica[2],formacionAcademica[3] , formacionAcademica[4] ,formacionAcademica[5] , formacionAcademica[6] ,  formacionAcademica[7] 
        ]
    );
    const datoslabo = await pool.query('INSERT INTO datoslaborales  (idcurpfk , nombre_institucion , direccion ,puesto , telefono) VALUES ($1, $2 , $3 , $4 , $5 )',
        [   
            personas[0],datoslaborales[0],datoslaborales[1],datoslaborales[2],datoslaborales[3]
        ]
    );
    const infoAdic = await pool.query('INSERT INTO infoadicional (idcurpfk , marca_modelo_Vehiculo , placas_Vehiculo ,comoseenterodelcuros , comoseenterodelcurosOtro , recomendacion_Nombre , recomendacion_Email ,recomendacion_telCel ) VALUES ($1, $2 , $3 , $4 , $5 ,$6 , $7 , $8 )',
        [   
            personas[0],InfoAdicional[0],InfoAdicional[1],InfoAdicional[2],InfoAdicional[3] , InfoAdicional[4] , InfoAdicional[5] ,InfoAdicional[6]
        ]
    );


    return {"mensaje" :'Servicio agregado'};
}
const getPathFile = async ( data ) => {
    var curp = data;
    const response = await pool.query('SELECT * FROM filespersona WHERE idcurpfk = $1' ,[curp]);
    return {"Info":response.rows};
};
const getDataUsers = async ( curp ) => {
    var curp = curp;
    // const response = await pool.query('SELECT * FROM personas FULL JOIN formacionacademica ON personas.curp = formacionacademica.idcurpfk FULL JOIN filespersona ON  personas.curp =  filespersona.idcurpfk FULL JOIN datoslaborales ON personas.curp = datoslaborales.idcurpfk FULL JOIN contactoemergencia ON personas.curp = contactoemergencia.idcurpfk WHERE personas.curp = $1',[curp]);
    const response0 = await pool.query('SELECT * FROM personas WHERE curp = $1' ,[curp]);
    var data_persona = response0.rows;
    
    const response1 = await pool.query('SELECT * FROM contactoemergencia WHERE idcurpfk = $1' ,[curp]);
    var data_contacto = response1.rows;
    
    const response2 = await pool.query('SELECT * FROM formacionacademica WHERE idcurpfk = $1' ,[curp]);
    var data_formacionacademicia = response2.rows;
    
    const response3 = await pool.query('SELECT * FROM datoslaborales WHERE idcurpfk = $1' ,[curp]);
    var data_laborales = response3.rows;
    
    var data_Full =[data_persona,data_contacto,data_formacionacademicia,data_laborales]

    return {
        "data":data_Full
    }
}
const getPagos = async () => {
    // const response = await pool.query('SELECT * FROM pagos  ORDER BY idpagos DESC');
    var querySQL ='SELECT * FROM pagos INNER JOIN ServicioEducativo ON   pagos.idserviciosedufk = ServicioEducativo.idserviciosedu ORDER BY idpagos DESC;';
    const response = await pool.query(querySQL);

    var data = response.rows;
    var bdPagos = []
    for (let index = 0; index < data.length; index++) {
        bdPagos.push(data[index]);
    }
    return {"Info":bdPagos};
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

    const responsePersona = await pool.query('SELECT * FROM personas  ORDER BY idPersona ASC');
    data = responsePersona.rows;
    var bdAlumnos = []
    for (let index = 0; index < data.length; index++) {
        bdAlumnos.push(data[index].curp);
    }
    

    return {"Info":bdServicios , "Curp":bdAlumnos};
};


const setCrearPago = async ( data) => {
    var nowDateTime = Date.now();
    var dat= new Date(); //Obtienes la fecha
    var dat2 = Date.parse(dat); //Lo parseas para transformarlo

    const contacto = await pool.query('INSERT INTO pagos  (idcurpfk , idServiciosEduFk , numModulo ,comprobantePath , cedulaPath ,referencia , cantidad, FechaHoraTicket , FECHA_INICIO , FECHA_TERMINO , fechaHoraRegistro) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11)',
    [   
        data[0],data[1],data[2],data[3],data[4] , data[5] , data[6] , data[7] , data[8] ,  data[9] , dat
     ]);
    

    return {"mensaje" :'Pago registrado'};
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
    setCrearPago
};
