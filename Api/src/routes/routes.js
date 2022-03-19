const express = require('express');
const { Pool } = require('pg');
var fs = require('fs');
let json = require('../config/configApi.json');
let rutas = json['rutas'];
// const fileUp = require('express-fileupload');
const routes = express.Router();
const db = require('../controllers/controller.db.js');
const { error } = require('console');
const objUtil = require('../utilities/util.js');
const imageToBase64 = require('image-to-base64');

// var pathFull = __dirname;
// var isfind = pathFull.lastIndexOf("src");
// var pathLog = pathFull.slice(0 , isfind) + rutas[0]["pathLog"];
var pathLog = __dirname + rutas[0]["pathLog"];


var log4js = require("log4js");
log4js.configure({
    appenders: {
        everything: { type: 'file', filename: pathLog }
    },
    categories: {
        default: { appenders: ['everything'], level: 'all' }
    }
});

var logger = log4js.getLogger("everything");


routes.get('/one', (req, res) => {
    logger.info("El servidor esta en linea");
    res.send({ "name": "Testing Api" });
});

routes.get('/Servicios', (req, res) => {
    logger.info("Obtenemos la lista de servicios");
    db.getServicios().then(respuesta => {
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`Servicios error :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.get('/Alumnos', (req, res) => {
    logger.info("Obtenemos la lista de alumnos");
    db.getAlumnos().then(respuesta => {
        res.json({ "status": 200, "data": respuesta['Info'] });
    }).catch(error => {
        logger.error(`Alumnos error :${error.message}`);
        res.json({ "status": 400, "data": error.message });

    })
});

routes.post('/updateHabilitado', (req, res) => {
    logger.info("Cambiamos el estado de un servicio");
    db.updateHabilitado(req).then(respuesta => {
        res.json(respuesta);
    }).catch(error => {
        logger.error(`updateHabilitado :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.post('/createServicio', (req, res) => {
    logger.info("Creamos servicio");
    db.createServicio(req).then(respuesta => {
        res.json(respuesta);
    }).catch(error => {
        logger.error(`createServicio :${error}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.post('/ExisteCurp', (req, res) => {
    logger.info("Validamos existencia de curp");
    db.getCurp(req).then(respuesta => {
        if (respuesta == 0) {
            res.json({ "mensaje": respuesta });
        } else {
            res.json({ "mensaje": respuesta });
        }
        // res.json({ "status": 200 , "Servicios":respuesta});
        // res.json(respuesta);
    }).catch(error => {
        logger.error(`ExisteCurp :${error.message}`);
    })
});

routes.post('/createRegistro', (req, res) => {
    logger.info("Insertamos un nuevo ingreso");
    // try {
    let datos = req.body;
    let sampleFile;
    const curp = datos.curp;
    let resp;
    //En esta ruta se guardan los archivos pdf 
    var dirpdf = __dirname + rutas[0]['upload'] + curp + '/';
    sampleFile = req.files.fileCurp;
    dirpdf = save(req, dirpdf, sampleFile);

    //En esta ruta se guardan las fotografias 
    var dirimg = __dirname + rutas[0]['images'] + curp + '/';
    sampleFile = req.files.fileImg;
    dirimg = save(req, dirimg, sampleFile);

    //En esta ruta se guardan las fotografias 
    var dirpdfEvidencia = __dirname + rutas[0]['upload'] + curp + '/';
    sampleFile = req.files.fileEvidencia;
    if (sampleFile == undefined) {
        dirpdfEvidencia = ""
    } else {
        dirpdfEvidencia = save(req, dirpdfEvidencia, sampleFile);
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



    db.createIngreso(datosPersonales, contactoEmergecia, datosLaborales, filepath, formacionAcademica, informacionAdicional).then(respuesta => {
        res.json({ "status": 200, "data": respuesta });

    }).catch(error => {
        logger.error(`createRegistro :${error.message}`);

        res.json({ "status": 400, "data": error.message });

    })

});

const save = (req, dir, sampleFile, isPago = false, complementoName = "") => {

    let uploadPath;
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log('No file were uploaded');
            logger.error(`No file were uploaded`);

        }
        if (isPago) {
            uploadPath = dir + "_" + complementoName + "_" + objUtil.RandomName2() + sampleFile.name;
        } else {
            uploadPath = dir + "_" + objUtil.RandomName() + sampleFile.name;
        }

        
        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                logger.error(`Error  :${err}`);
            }
        });
        logger.debug(`Guardamos archivo en ruta :${uploadPath} ...`);

        return uploadPath;
    } catch (error) {
        logger.error(`save :${error}`);
        return error;

    }

}
routes.get('/downloadFile', (req, res) => {
    logger.info("Descargamos un archivo");

    var curp = req.query.curp;
    var tipo = parseInt(req.query.tipo);
    db.getPathFile(curp).then(respuesta => {
        let file_path = "";
        if (tipo == 0) {
            file_path = respuesta['Info'][0].fotografiaimg
        } else if (tipo == 1) {
            file_path = respuesta['Info'][0].curppdf
        } else {
            file_path = respuesta['Info'][0].evidenciaipnpdf
        }
        // var file_name = file_path.replace(/^.*[\\\/]/, '');
        // var extension = file_name.split('.').pop();
        // file_name = curp+'.'+extension;
        if (file_path === '') {
            // res.status(404);
            res.status(404).send("Not found");
        } else {
            // res.download(file_path , file_name); // Set disposition and send it.
            res.download(file_path, (err) => {
                if (err) {
                    res.status(200).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });
        }
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
    }).catch(error => {
        logger.error(`downloadFile :${error}`);
    })
});



routes.post('/imagen64', (req, res) => {
    logger.info("Generamos imagen base 64");

    var curp = req.body.curp;
    let file_path = "";
    db.getPathFile(curp).then(respuesta => {
        file_path = respuesta['Info'][0].fotografiaimg
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
        imageToBase64(file_path) // Path to the image
            .then((response) => {
                var file_name = file_path.replace(/^.*[\\\/]/, '');
                var extension = file_name.split('.').pop();
                res.status(200).send({
                    message: "data:image/" + extension + ";base64," + response,
                });
                // res.status(200).send({
                //         message: "<img src='data:image/png;base64,'"+response+"class='img-thumbnail rounded mx-auto d-block' style='height:400px'>"
                //     });
            })
    }).catch(error => {
        logger.error(`downloadFile :${error}`);
    })
});


routes.post('/AlumnoJoin', (req, res) => {
    logger.info("informacion del alumno");

    var curp = req.body.curp;

    db.getDataUsers(curp).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta['data']);
    }).catch(error => {
        logger.error(`downloadFile :${error}`);
    })
});


routes.get('/Pagos', (req, res) => {
    logger.info("Obtenemos la lista de pagos");
    db.getPagos().then(respuesta => {
        res.json({ "status": 200, "data": respuesta['Info'] });
    }).catch(error => {
        logger.error(`Pagos :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.get('/ServiciosLista', (req, res) => {
    logger.info("Obtenemos la lista de personas y servicios para los pagos");
    db.getDataServicios().then(respuesta => {
        res.json({ "status": 200, "data": respuesta['Info'], "Curp": respuesta['Curp'] , "Cursos": respuesta['Cursos']});

    }).catch(error => {
        logger.error(`ServiciosLista :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.post('/CrearPago', (req, res) => {
    logger.info("Generamos un nuevo pago");

    let datos = req.body;
    let sampleFile;
    const curp = datos.alumnosNameCurp;

    //Aqui se empieza a guardar el comprobanye del pago del alumno
    var dirComprobante = __dirname + rutas[0]['upload'] + curp + '/';
    var name = "_Comprobante_" + datos.ServicioEducativo + "_Modulo_" + datos.NumModulo;
    sampleFile = req.files.comprobantePago;
    dirComprobante = save(req, dirComprobante, sampleFile, true, name);


    //En esta ruta se guardan las fotografias 
    var dirCedula = __dirname + rutas[0]['upload'] + curp + '/';
    sampleFile = req.files.cedulaFiscal;
    name = "_CedulaFiscal_" + datos.ServicioEducativo + "_Modulo_" + datos.NumModulo;
    if (sampleFile == undefined) {
        dirCedula = ""
    } else {
        dirCedula = save(req, dirCedula, sampleFile, true, name);
    }
    data = [
        curp,
        datos.idServicioEducativo,
        datos.NumModulo,
        dirComprobante,
        dirCedula,
        datos.referencia,
        datos.Cantidad,
        datos.fechaHoraBaucher,
        datos.dateInicio,
        datos.dateFinish,
        datos.facturaElectronica,
        datos.descripcion,
        datos.inicioCurso
    ]
    db.setCrearPago(data).then(respuesta => {
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`CrearPago :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});



routes.post('/DataServicioPDF', (req, res) => {
    logger.info("Servicios pdf");

    var idServicio = req.body.idServicio;

    db.getDataServicioPDF(idServicio).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta['data']);
    }).catch(error => {
        logger.error(`DataServicioPDF :${error.message}`);
    })
});

routes.post('/DataPagosPDF', (req, res) => {
    logger.info("Pagos pdf");

    var idPago = req.body.idPago;

    db.getDataPagosPDF(idPago).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta);
    }).catch(error => {
        logger.error(`DataPagosPDF :${error.message}`);
    })
});

routes.post('/getUpdateServicios', (req, res) => {
    logger.info("Data para actualizar");

    var idServicio = req.body.idServicio;

    db.getDataServicioPDF(idServicio).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta['data']);
    }).catch(error => {
        logger.error(`getUpdateServicios :${error.message}`);
    })
});


routes.post('/UpdateServicios', (req, res) => {
    logger.info("Actualizamos  servicios");

    db.UpdateServicio(req).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta);
    }).catch(error => {
        logger.error(`UpdateServicios :${error.message}`);
        res.json(error);
    })
});


routes.get('/downloadFilePagos', (req, res) => {
    logger.info("Download file pagos");

    var idPago = req.query.idPago;
    var tipo = parseInt(req.query.tipo);
    db.getPathPagos(idPago).then(respuesta => {
        let file_path = "";
        if (tipo == 0) {
            file_path = respuesta['Info'][0].comprobantepath
        } else if (tipo == 1) {
            file_path = respuesta['Info'][0].cedulapath
        }
        // var file_name = file_path.replace(/^.*[\\\/]/, '');
        // var extension = file_name.split('.').pop();
        // file_name = curp+'.'+extension;
        if (file_path === '') {
            // res.status(404);
            res.status(404).send("Not found");
        } else {
            // res.download(file_path , file_name); // Set disposition and send it.
            res.download(file_path, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });
        }
        // const file = '/home/tomas/Documentos/Aldebaran/Aldebaran/Api/src/routes/resource/image/curpalumno/2xz1k0at7124279eeecnw9índice.jpeg';
    }).catch(error => {
        logger.error(`downloadFilePagos :${error.message}`);
    })
});



routes.post('/getUpdatePagos', (req, res) => {
    logger.info("Obetenemos la data a actualizar");

    var idPago = req.body.idPago;
    db.getDataPagosPDF(idPago).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta);
    }).catch(error => {
        logger.error(`getUpdatePagos :${error.message}`);
    })
});



routes.post('/UpdatePagos', (req, res) => {
    logger.info("Actualizamos pagos");

    let datos = req.body;
    let sampleFile;
    const curp = datos.alumnosNameCurp;
    let query = "";
    let data = [];
    // const response = await pool.query('UPDATE servicioeducativo SET  registro_academico = $1 , tipo_evento = $2 , programa_academico = $3 , modalidad = $4 , cuota = $5 , nummodulo  = $6 , numHoras = $7  WHERE idServiciosEdu = $8' , [registroAcade,evento,nombreAcademico, modalidad ,cuota,numModulo , numHoras , idServicio]);
    // const contacto = await pool.query('INSERT INTO pagos  (idcurpfk , idServiciosEduFk , numModulo ,comprobantePath , cedulaPath ,referencia , cantidad, FechaHoraTicket , FECHA_INICIO , FECHA_TERMINO ,facturacion ,fechaHoraRegistro , descripcion) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13)',

    if (datos.dateInicio === '') {
        datos.dateInicio = null;
        datos.dateFinish = null;
    }
    data = [
        curp,
        datos.idServicioEducativo,
        datos.NumModulo,
        datos.referencia,
        datos.Cantidad,
        datos.fechaHoraBaucher,
        datos.dateInicio,
        datos.dateFinish,
        datos.facturaElectronica,
        datos.descripcion
    ]
    query = 'UPDATE pagos SET idcurpfk = $1 , idServiciosEduFk = $2 , numModulo = $3 , referencia = $4 ,  cantidad = $5 , FechaHoraTicket = $6 , FECHA_INICIO = $7 , FECHA_TERMINO = $8 , facturacion = $9 ,  descripcion = $10  ';

    if (req.files !== null) {
        //Ninguno de los dos archivo estan cargados
        let iscomprobante = false;
        //Aqui se empieza a guardar el comprobanye del pago del alumno
        var dirComprobante = __dirname + rutas[0]['upload'] + curp + '/';
        var name = "_Comprobante_" + datos.ServicioEducativo + "_Modulo_" + datos.NumModulo;
        sampleFile = req.files.comprobantePago;
        if (sampleFile !== undefined) {
            dirComprobante = save(req, dirComprobante, sampleFile, true, name);
            query = query + ' ,comprobantePath = $11';
            data.push(dirComprobante);
            iscomprobante = true;
        }

        var dirCedula = __dirname + rutas[0]['upload'] + curp + '/';
        sampleFile = req.files.cedulaFiscal;
        var name = "_CedulaFiscal_" + datos.ServicioEducativo + "_Modulo_" + datos.NumModulo;
        if (sampleFile !== undefined) {
            dirCedula = save(req, dirCedula, sampleFile, true, name);
            if (iscomprobante) {
                query = query + ' , cedulaPath = $12'
                query = query + '  WHERE idPagos = $13'
            }
            else {
                query = query + ' , cedulaPath = $11'
                query = query + '  WHERE idPagos = $12'
            }

            data.push(dirCedula);
            data.push(datos.idPagoUpdate);
        } else {
            query = query + '  WHERE idPagos = $12';
            data.push(datos.idPagoUpdate);
        }
    } else {
        query = query + '  WHERE idPagos = $11'
        data.push(datos.idPagoUpdate);
    }




    db.UpdatePagos(query, data , datos.inicioCurso , datos.idPagoUpdate).then(respuesta => {
        res.json(respuesta);
    }).catch(error => {
        logger.error(`UpdatePagos :${error.message}`);
        res.json(error.message);
    })

});

routes.post('/UpdateRegistro', (req, res) => {
    logger.info("Actualizamos  resgitros de alumnos");

    let datos = req.body;
    let sampleFile;
    const curp = datos.curp;
    //Tablas a actualizar
    /*
     * personas 
     * contactoemergencia
     * formacionacademica
     * datoslaborales
     * INFOADICIONAL
     */
    let filepath = [];
    //Tabla datos del alumnos
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

    //Tabla datos laborales
    let datosLaborales = [
        datos.nombreInst,
        datos.domicilioInst,
        datos.puestoInst,
        datos.telefonoInst
    ];

    //   Tabla formacion academica
    let formacionAcademica = [
        datos.nivMaxStudy,
        datos.acadSituacion,
        datos.SitemaEducativoProcedencia,
        datos.SitemaEducativoProcedenciaOtro,
        datos.insEducativa,
        datos.anioEgreso,
        datos.UniversidadAspira,
        datos.CarreraAspira
    ];
    //Tabla contacto de emergencia

    let contactoEmergecia = [
        datos.nombreEmergencia,
        datos.appPatEmergencia,
        datos.appMatEmergencia,
        datos.telEmergencia,
        datos.emailEmergencia
    ];
    // Tabla informacion adicion
    let informacionAdicional = [
        datos.marca_modelo,
        datos.placas,
        datos.comoseenterodelcurso,
        datos.comoseenterodelcursoOtro,
        datos.recomendacionCursoNombre,
        datos.recomendacionCursoemail,
        datos.recomendacionCursotelce
    ]
    let sendFiles = false;
    if (req.files !== null) {
        let getDataUrl = [];
        let queryFilePath = "";
        var buildQuery = new Map();
        queryFilePath = "UPDATE FilesPersona SET "
        sendFiles = true;
        //Alguno de los archivos se va a actualizar
        //Comprobamos si la curp pdf se actualizo
        let dirpdf = __dirname + rutas[0]['upload'] + curp + '/';
        sampleFile = req.files.fileCurp;
        if (sampleFile !== undefined) {
            dirpdf = save(req, dirpdf, sampleFile);
            buildQuery.set("CurpPdf", dirpdf);
        }

        //En esta ruta se guardan las fotografias 
        let dirimg = __dirname + rutas[0]['images'] + curp + '/';
        sampleFile = req.files.fileImg;
        if (sampleFile !== undefined) {
            dirimg = save(req, dirimg, sampleFile);
            buildQuery.set(" FotografiaImg", dirimg);
        }

        //En esta ruta se guardan las fotografias 
        let dirpdfEvidencia = __dirname + rutas[0]['upload'] + curp + '/';
        sampleFile = req.files.fileEvidencia;
        if (sampleFile !== undefined) {
            dirpdfEvidencia = save(req, dirpdfEvidencia, sampleFile);
            buildQuery.set(" EvidenciaipnPdf", dirpdfEvidencia);
        }

        let cont = 1;
        for (let clave of buildQuery.keys()) {
            var valor = buildQuery.get(clave);
            queryFilePath += clave + " =  $" + cont + ",";
            getDataUrl.push(valor);
            cont++;
        }
        getDataUrl.push(curp);
        queryFilePath += "  WHERE idcurpfk " + " =  $" + cont;

        var isfind = queryFilePath.lastIndexOf(",");
        var len = queryFilePath.length;
        var newQuery = queryFilePath.slice(0 , isfind) + " " + queryFilePath.slice(isfind+1 ,len);

        filepath.push(newQuery)
        filepath.push(getDataUrl);

    }

    db.UpdateRegistro(datosPersonales, contactoEmergecia, datosLaborales, filepath, formacionAcademica, informacionAdicional, sendFiles).then(respuesta => {
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`UpdateRegistro :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })


});


routes.post('/CrearInicioCursos', (req, res) => {
    logger.info("Generamos uun nuevo inicio de clases");
    db.createInicioCurso(req).then(respuesta => {
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`CrearInicioCursos :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});


routes.get('/getInicioCursos', (req, res) => {
    logger.info("Generamos uun nuevo inicio de clases");
    db.getInicioCurso().then(respuesta => {
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`CrearInicioCursos :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});

routes.post('/updateHabilitadoFechas', (req, res) => {
    logger.info("Cambiamos el estado de un fechas");
    db.updateHabilitadoFechasBD(req).then(respuesta => {
        res.json(respuesta);
    }).catch(error => {
        logger.error(`updateHabilitadoFechas :${error.message}`);
        res.json({ "status": 400, "data": error.message });
    })
});


routes.post('/getUpdateFecha', (req, res) => {
    logger.info("Obetenemos la data a actualizar");

    var idFecha = req.body.idFecha;
    db.getDataFechaEdit(idFecha).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        res.json(respuesta);
    }).catch(error => {
        logger.error(`getUpdateFecha :${error.message}`);
    })
});

routes.post('/UpdateFecha', (req, res) => {
    logger.info("Obetenemos la data a actualizar");

    db.UpdateFecha(req).then(respuesta => {
        // res.json({ "status": 200 , "Servicios":respuesta});
        // res.json(respuesta);
        res.json({ "status": 200, "data": respuesta });
    }).catch(error => {
        logger.error(`UpdateFecha :${error.message}`);
        res.json({ "status": 400, "data": error.message });
          
    })
});
module.exports = routes;
