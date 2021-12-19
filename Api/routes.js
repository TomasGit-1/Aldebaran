const express = require('express');
const { Pool  } = require('pg');
const fileUpload = require('express-fileupload');
var fs = require('fs');

const routes = express.Router();
/*
    *Obtenemos la configuracion de la base de datos  
 */
let json = require('./config/configApi.json');
let rutas = json['rutas'];
let conexion = json['postgresql'];
const config = {
    host:conexion[0]['host'],
    user:conexion[0]['user'],
    password:conexion[0]['password'],
    database:conexion[0]['database'],
    port:conexion[0]['port']
}
/*
    *Finaliza la configuracion de la base de datos
*/


// Aqui va toda la logica
routes.get('/' , (req, res)=> {
    res.send({ "name":"Testing Api"});
});

// Aqui va toda la logica
routes.get('/Api' , (req, res)=> {
    res.send(' Api');
});
//Recibimos la informacion del formulario 0
routes.post('/Api/Form0',  (req, res )=> {
    let datos = req.body;

    let sampleFile;
    const curp = datos['curp'];
    //En esta ruta se guardan los archivos pdf 
    var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
    sampleFile = req.files.pdfcurp;
    save(req , dirpdf , sampleFile);

    //En esta ruta se guardan las fotografias 
    var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
    sampleFile = req.files.imgUser;
    save(req , dirimg , sampleFile);

    // res.status(400).send('No file were uploaded')
    res.json({ "status": 200});
});
const save = ( req , dir , sampleFile) =>{
    let uploadPath;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
    }
    if(!req.files || Object.keys(req.files).length === 0 ){
        return [false , "No existe el archivo"];
    }
    console.log("Ss existe en archivos");
    uploadPath = dir+ sampleFile.name;
    console.log(sampleFile);
    console.log(uploadPath);
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return  [false , err];
        return  [true , "Save"];
    });

}


//Obtenemos Servicio educativo habilitados
routes.get('/ServEducativo' , (req, res)=> {
    const pool = new Pool(config).promises;
    pool.connect()
    pool.query('SELECT * FROM SERVICIOEDUCATIVO')
    .then(response => {
        var data = response.rows;
        let setArray =[]
        data.map(row =>{
            if(row["habilitado"]){
                setArray.push(row["nombre_servicio"]);
            }
        })
        pool.end()
        res.json({ "Servicios":setArray});
    })
    .catch(err => {
        res.json({ "Error":err});
        pool.end()
    })
});
//Obtenemos Servicio educativo habilitados
routes.get('/TablaEducativo' , (req, res)=> {
    const pool = new Pool(config);
    pool.connect()
    pool
    .query('SELECT * FROM SERVICIOEDUCATIVO')
    .then(result => {
        console.log(result.rows);
        var data = result.rows;
        let id =[]
        let servicio =[]
        let habilitado =[]
        data.map(row =>{
            //setArray =[]
            id.push(row['idserviciosedu']);
            servicio.push(row['nombre_servicio']);
            habilitado.push(String(row['habilitado']));
        })
        res.json({"id":id, "Servicios":servicio , "habilitado":habilitado});
    })
    .catch(e => console.error(e.stack))
    .then(() => pool.end())
});
//Obtenemos Servicio educativo habilitados
routes.post('/InsertarServicio' , (req, res)=> {
    let datos = req.body;
    console.log(datos.data.servicioNew);
    const text = 'INSERT INTO servicioeducativo (nombre_servicio , habilitado) VALUES($1, $2) RETURNING *'
    const values = [datos.data.servicioNew, 1]
    const pool = new Pool(config);
    pool.connect()
    pool
    .query(text ,values )
    .then(result => {
        console.log(result.rows[0])
        res.json({ "status": 200});
    })
    .catch(e => console.error(e.stack))
    .then(() => pool.end())
});

module.exports = routes;
