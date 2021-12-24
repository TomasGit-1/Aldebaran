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

const Home = async(req , res ) =>{
    res.status(200).json("Server funcionando")

};

const getServicios = async (req, res) => {
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
    res.status(200).json({"id":id, "Servicios":servicio , "habilitado":habilitado});
};

const createServicio = async (req, res) => {
    let datos = req.body;
    let servicio = datos.data.servicioNew;
    const response = await pool.query('INSERT INTO servicioeducativo  (nombre_servicio , habilitado) VALUES ($1, $2)', [servicio, 1]);
    res.json({
        message: 'Service Added successfully',
        body: {
            Servicio: {servicio}
        }
    })
};

const updateHabilitado = async (req, res) => {
    let datos = req.body;
    let id = datos.data.id;
    let newhabilitadp = datos.data.habilitado;
    const response =await pool.query('UPDATE SERVICIOEDUCATIVO SET habilitado = $1   WHERE idServiciosEdu = $2', [
        newhabilitadp,
        id,
    ]);
    res.json('User Updated Successfully');
};

const createRegistro = async (req , res )=>{
    try {
        var datos = req;
       
        // var datos = req.body.data
        // let datos = req.body;
        // let sampleFile;
        // const curp = datos.data.curp_Alumno;
    
        // //En esta ruta se guardan los archivos pdf 
        // var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
        // sampleFile = req.files.pdfcurp;
        // save(req , dirpdf , sampleFile);
    
        // //En esta ruta se guardan las fotografias 
        // var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
        // sampleFile = req.files.imgUser;
        // let respuesta = save(req , dirimg , sampleFile);
        res.json({ "status": respuesta});
        
    } catch (error) {
        res.json({ "error": error.message});

    }
}

const save = ( req , dir , sampleFile) =>{
    let uploadPath;
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
        }
        if(!req.files || Object.keys(req.files).length === 0 ){
            console.log('No file were uploaded');
        }

        uploadPath = dir+ sampleFile.name;
        sampleFile.mv(uploadPath, function(err) {
            if (err){
                console.log(err);
            }
        });
        return 200;
    } catch (error) {
        return error;
        
    }

}







// const getUsers = async (req, res) => {
//     const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
//     res.status(200).json(response.rows);
// };

// const getUserById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     res.json(response.rows);
// };

// const createUser = async (req, res) => {
//     const { name, email } = req.body;
//     const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
//     res.json({
//         message: 'User Added successfully',
//         body: {
//             user: {name, email}
//         }
//     })
// };

// const updateUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name, email } = req.body;

//     const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
//         name,
//         email,
//         id
//     ]);
//     res.json('User Updated Successfully');
// };

// const deleteUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     await pool.query('DELETE FROM users where id = $1', [
//         id
//     ]);
//     res.json(`User ${id} deleted Successfully`);
// };

module.exports = {
    getServicios,
    createServicio,
    updateHabilitado,
    Home,
    createRegistro 
    
};