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
    // try {
    let datos = req.body;
    let sampleFile;
    const curp = datos.curp;
    let resp;
    //En esta ruta se guardan los archivos pdf 
    var dirpdf = __dirname +  rutas[0]['upload'] + curp+'/';
    sampleFile = req.files.fileCurp;
    dirpdf =save(req , dirpdf , sampleFile);
    console.log("Se guardo el archivo pdf ");
    
    //En esta ruta se guardan las fotografias 
    var dirimg = __dirname +  rutas[0]['images'] + curp+'/';
    sampleFile = req.files.fileImg;
    dirimg = resp = save(req , dirimg , sampleFile);
    console.log("Se guardo el archivo img ");

    //En esta ruta se guardan las fotografias 
    var dirpdfEvidencia = __dirname +  rutas[0]['upload'] + curp+'/';
    sampleFile = req.files.fileEvidencia;
    if (sampleFile == undefined) {
        dirpdfEvidencia=""
    } else {
        dirpdfEvidencia = save(req , dirpdfEvidencia , sampleFile);
    }
    //Datos personales
    let arrayBD = [
        //tabla persona
        curp,
        datos.emailAlum,
        datos.nombreAlum,
        datos.appPatAlum,
        datos.appMatAlum,
        datos.genero,
        datos.fechaNacimiento,
        datos.edad,
        datos.telParticularAlum,
        datos.telCelularAlum,
        datos.calle,
        datos.colonia,
        datos.codigoPostal,
        datos.municipio,
        datos.NumeroDom,
        
        //TablaFilePerson
        dirimg,
        dirpdfEvidencia,
        dirpdf,
        //17
        
        //Tabla constacto emergencia
        datos.nombreEmergencia,
        datos.appPatEmergencia,
        datos.appMatEmergencia,
        datos.telEmergencia,
        datos.emailEmergencia,
        //22
        

        //Tabla formacion academica
        datos.nivMaxStudy,
        datos.acadSituacion,
        datos.insEducativa,
        datos.anioEgreso,
        //26
        
        //Tabla datos laborales
        datos.nombreInst,
        datos.domicilioInst,
        datos.puestoInst,
        datos.telefonoInst

        
    ]
    db.createIngreso(arrayBD).then(respuesta =>{
        
        res.json({ "status": respuesta});
    }).catch(error =>{
        console.log(error);
    })
    // } catch (error) {
    //     res.json({ "error": error.message});
    // }
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
        return uploadPath;
    } catch (error) {
        return error;
        
    }

}

routes.post('/downloadFile',  (req, res )=> {
    var curp = req.body.curp;
    db.getPathFile(curp).then(respuesta =>{
        console.log(respuesta);
        res.json({ "status": respuesta});
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
        // res.download(file); // Set disposition and send it.
    }).catch(error =>{
        console.log(error);
    })
});


module.exports = routes;
