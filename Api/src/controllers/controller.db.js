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
    const response = await pool.query('SELECT * FROM SERVICIOEDUCATIVO ORDER BY idServiciosEdu ASC');
    var data = response.rows;
    let id =[]
    let registro = []
    let evento = []
    let programaAcademico =[]
    let habilitado =[]
    let modalidad =[]
    let cuota =[]
    data.map(row =>{
        id.push(row['idserviciosedu']);
        registro.push(row['registro_academico']);
        evento.push(row['tipo_evento']);
        programaAcademico.push(row['programa_academico']);
        habilitado.push(String(row['habilitado']));
        modalidad.push(row['modalidad']);
        cuota.push(row['cuota']);
    })
    return {"id":id, "registro":registro , "evento":evento , "programaAcademico":programaAcademico, "habilitado":habilitado , "modalidad":modalidad,"cuota":cuota };
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
    const response = await pool.query('INSERT INTO servicioeducativo  (registro_academico , tipo_evento , programa_academico ,modalidad , cuota , habilitado ) VALUES ($1, $2 , $3 , $4 , $5 , $6 )', [registroAcade,evento,nombreAcademico, modalidad ,cuota, 1]);
    console.log(response);
    return {"mensaje" :'Servicio agregado'};
};


const createIngreso = async (req) => {
    let datos = req.body;

    return {"mensaje" :'Servicio agregado'};
}

module.exports = {
    Home,
    getServicios,
    getAlumnos,
    updateHabilitado,
    getCurp,
    createServicio
};
