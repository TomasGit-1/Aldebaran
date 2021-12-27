const express = require('express');
const { Pool  } = require('pg');
var fs = require('fs');
const fileUpload = require('express-fileupload');
const routes = express.Router();
const db = require('../controllers/controller.db.js');
const { error } = require('console');
routes.get('/one' , (req, res)=> {
    
    res.send({ "name":"Testing Api"});
});

routes.get('/Servicios',  (req, res )=> {
    db.getServicios().then(respuesta =>{
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta);
    }).catch(error =>{
        console.log(error);
    })
});

routes.post('/updateHabilitado' , (req, res)=> {
    db.updateHabilitado(req).then(respuesta =>{
        res.json(respuesta);
    }).catch(error => {
        console.log(error);
    })
});

routes.post('/createServicio' , (req, res)=> {
    db.createServicio(req).then(respuesta =>{
        res.json(respuesta);
    }).catch(error => {
        console.log(error);
    })
});

routes.post('/createRegistro',  (req, res )=> {
    db.Home().then(respuesta =>{
        // console.log(db.Home());
        // let datos = req.body;
        // let sampleFile;
        // const curp = datos['curp'];
    
        // //En esta ruta se guardan los archivos pdf 
        // var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
        // sampleFile = req.files.pdfcurp;
        // save(req , dirpdf , sampleFile);
    
        // //En esta ruta se guardan las fotografias 
        // var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
        // sampleFile = req.files.imgUser;
        // let respuesta = save(req , dirimg , sampleFile);
        res.json({ "status": respuesta});
    }).catch(error =>{
        console.log(error)
    })
});

module.exports = routes;
