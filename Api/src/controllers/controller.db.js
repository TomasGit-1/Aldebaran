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
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

const Home = async () =>{
    // console.log("Hola Bd");
    return 200;
};
const getServicios = async (valor) => {
    const response = await pool.query('SELECT * FROM SERVICIOEDUCATIVO');
    var data = response.rows;
    let id =[]
    let servicio =[]
    let habilitado =[]
    data.map(row =>{
        id.push(row['idserviciosedu']);
        servicio.push(row['nombre_servicio']);
        habilitado.push(String(row['habilitado']));
    })
    return {"id":id, "Servicios":servicio , "habilitado":habilitado};
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
const createServicio = async (req) => {
    let datos = req.body;
    let servicio = datos.data.servicioNew;
    const response = await pool.query('INSERT INTO servicioeducativo  (nombre_servicio , habilitado) VALUES ($1, $2)', [servicio, 1]);
    console.log(response);
    return {"mensaje" :'Servicio agregado'};
};

module.exports = {
    Home,
    getServicios,
    updateHabilitado,
    createServicio
};
