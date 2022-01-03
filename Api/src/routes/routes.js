const express = require('express');
const { Pool  } = require('pg');
var fs = require('fs');
let json = require('../config/configApi.json');
let rutas = json['rutas'];
// const fileUp = require('express-fileupload');
const routes = express.Router();
const db = require('../controllers/controller.db.js');
const { error } = require('console');
const objUtil  = require('../utilities/util.js')
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
routes.get('/Alumnos',  (req, res )=> {
    db.getAlumnos().then(respuesta =>{
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta['Info']);
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

routes.post('/ExisteCurp',  (req, res )=> {
    db.getCurp(req).then(respuesta =>{
        if(respuesta == 0){
        res.json({"mensaje":respuesta});
        }else{
            res.json({"mensaje":respuesta});
        }
        // res.json({ "status": 200 , "Servicios":respuesta});
        // res.json(respuesta);
    }).catch(error =>{
        console.log(error);
    })
});


routes.post('/createRegistro',  (req, res )=> {
    try {
        let datos = req.body;
        let sampleFile;
        const curp = datos.curp;
        
        //En esta ruta se guardan los archivos pdf 
        var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
        sampleFile = req.files.fileCurp;
        save(req , dirpdf , sampleFile);
        
        //En esta ruta se guardan las fotografias 
        var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
        sampleFile = req.files.fileImg;
        let respuesta = save(req , dirimg , sampleFile);
        console.log(datos);








        
        res.json({ "status": respuesta});
        // db.Home().then(respuesta =>{
        //     console.log(db.Home());
        //     let datos = req.body;
        //     let sampleFile;
        //     const curp = datos['curp'];
        
        //     //En esta ruta se guardan los archivos pdf 
        //     var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
        //     sampleFile = req.files.pdfcurp;
        //     save(req , dirpdf , sampleFile);
        
        //     //En esta ruta se guardan las fotografias 
        //     var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
        //     sampleFile = req.files.imgUser;
        //     let respuesta = save(req , dirimg , sampleFile);
        //     res.json({ "status": respuesta});
        // }).catch(error =>{
        //     console.log(error)
        // })
    } catch (error) {
        res.json({ "error": error.message});
    }
});

const save = ( req , dir , sampleFile) =>{
    let uploadPath;
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
        }
        if(!req.files || Object.keys(req.files).length === 0 ){
            console.log('No file were uploaded');
        }

        uploadPath = dir+objUtil.RandomName()+sampleFile.name;
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


module.exports = routes;
