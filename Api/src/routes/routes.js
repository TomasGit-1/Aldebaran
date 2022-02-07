const express = require('express');
const { Pool  } = require('pg');
var fs = require('fs');
let json = require('../config/configApi.json');
let rutas = json['rutas'];
// const fileUp = require('express-fileupload');
const routes = express.Router();
const db = require('../controllers/controller.db.js');
const { error } = require('console');
const objUtil  = require('../utilities/util.js');
const imageToBase64 = require('image-to-base64');

routes.get('/one' , (req, res)=> {
    res.send({ "name":"Testing Api"});
});

routes.get('/Servicios',  (req, res )=> {
    db.getServicios().then(respuesta =>{
        res.json({ "status": 200 , "data":respuesta});
    }).catch(error =>{
        res.json({ "status": 400 , "data":error.message});
    })
});

routes.get('/Alumnos',  (req, res )=> {
    db.getAlumnos().then(respuesta =>{
        res.json({ "status": 200 , "data":respuesta['Info']});
    }).catch(error =>{
        res.json({ "status": 400 , "data":error.message});

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

    let datosPersonales = [
        curp,
        datos.emailAlum,
        datos.nombreAlum,
        datos.appPatAlum,
        datos.appMatAlum,
        datos.genero,
        datos.fechaNacimiento,
        datos.telParticularAlum,
        datos.telCelularAlum,
        datos.calle,
        datos.colonia,
        datos.codigoPostal,
        datos.municipio,
        datos.NumeroDom,
        datos.lugarNacimiento
    ];
    let filepath = [
        //TablaFilePerson
        dirimg,
        dirpdf,
        dirpdfEvidencia,
    ];
    let datosLaborales = [
        //Tabla datos laborales
        datos.nombreInst,
        datos.domicilioInst,
        datos.puestoInst,
        datos.telefonoInst
    ];
    let formacionAcademica = [
        //   Tabla formacion academica
        datos.nivMaxStudy,
        datos.acadSituacion,
        datos.SitemaEducativoProcedencia,
        datos.SitemaEducativoProcedenciaOtro,
        datos.insEducativa,
        datos.anioEgreso,
        datos.UniversidadAspira,
        datos.CarreraAspira
    ];
    
    let contactoEmergecia = [
        datos.nombreEmergencia,
        datos.appPatEmergencia,
        datos.appMatEmergencia,
        datos.telEmergencia,
        datos.emailEmergencia
    ];
    let informacionAdicional = [
        datos.marca_modelo,
        datos.placas,
        datos.comoseenterodelcurso,
        datos.comoseenterodelcursoOtro,
        datos.recomendacionCursoNombre,
        datos.recomendacionCursoemail,
        datos.recomendacionCursotelce
    ]

  

    db.createIngreso(datosPersonales , contactoEmergecia , datosLaborales , filepath , formacionAcademica , informacionAdicional ).then(respuesta =>{
        res.json({ "status": 200 , "data":respuesta});

    }).catch(error =>{
        console.log(error);
        res.json({ "status": 400 , "data":error.message});

    })
    
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
    var tipo = parseInt(req.body.tipo);
    db.getPathFile(curp).then(respuesta =>{
        let file_path = "";
        if(tipo == 0){
            file_path = respuesta['Info'][0].fotografiaimg
        }else if (tipo == 1){
            file_path = respuesta['Info'][0].curppdf
        }else{
            file_path = respuesta['Info'][0].evidenciaipnpdf
        }
        var file_name = file_path.replace(/^.*[\\\/]/, '');
        var extension = file_name.split('.').pop();
        file_name = curp+'.'+extension;
        if(file_path === ''){
            // res.status(404);
            res.status(404).send("Not found");
        }else{
            // res.download(file_path , file_name); // Set disposition and send it.
            res.download(file_path, 'report.pdf', (err) => {
                if (err) {
                  res.status(500).send({
                    message: "Could not download the file. " + err,
                  });
                }
            });
        }
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
    }).catch(error =>{
        console.log(error);
    })
});

routes.post('/imagen64' ,  (req, res) =>{
    var curp = req.body.curp;
    let file_path = "";
    db.getPathFile(curp).then(respuesta =>{
        file_path = respuesta['Info'][0].fotografiaimg
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
        imageToBase64(file_path) // Path to the image
        .then((response) => {
            var file_name = file_path.replace(/^.*[\\\/]/, '');
            var extension = file_name.split('.').pop();
            res.status(200).send({
                message:"data:image/"+extension+";base64,"+response,
            });
            // res.status(200).send({
            //         message: "<img src='data:image/png;base64,'"+response+"class='img-thumbnail rounded mx-auto d-block' style='height:400px'>"
            //     });
        })
    }).catch(error =>{
        console.log(error);
    })
});


routes.post('/AlumnoJoin',  (req, res )=> {
    var curp = req.body.curp;

    db.getDataUsers(curp).then(respuesta =>{
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta['data']);
    }).catch(error =>{
        console.log(error);
    })
});


routes.get('/Pagos',  (req, res )=> {
    db.getPagos().then(respuesta =>{
        res.json({ "status": 200 , "data":respuesta['Info']});

    }).catch(error =>{
        res.json({ "status": 400 , "data":error.message});
    })
});

routes.get('/ServiciosLista',  (req, res )=> {
    db.getDataServicios().then(respuesta =>{
        res.json({ "status": 200 , "data":respuesta['Info']});

    }).catch(error =>{
        res.json({ "status": 400 , "data":error.message});
    })
});


module.exports = routes;
