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
    let numModulo =[]
    let numHoras =[]
    data.map(row =>{
        console.log(row);
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


const createIngreso = async (req) => {
    let data = req;
    const response = await pool.query('INSERT INTO personas  (Curp , Nombre , AppPat ,AppMat , Fotografia , Sexo ,  FechaNacimiento , Edad , TelPar , TelCel , Calle , Colonia , CodigoPostal ,Municipio , numDomicilio ) VALUES ($1, $2 , $3 , $4 , $5 , $6 ,$7 , $8 , $9 , $10 , $11 , $12 , $13 , $14, $15)',
        [   
            datos[2],datos[5],datos[6],datos[7],datos[0],datos[3],datos[8],datos[9],datos[10],datos[11],,datos[12],datos[14],datos[15],datos[16] , datos[13] 
        ]);

    const response2 = await pool.query('INSERT INTO contactoemergencia  (idcurpfk , Nombre , AppPat ,AppMat , telefono_contacto ,email) VALUES ($1, $2 , $3 , $4 , $5 , $6 )',
        [   
            datos[2],datos[17],datos[18],datos[19],datos[20],datos[21]
    ]);

    const response3 = await pool.query('INSERT INTO formacionacademica  (idcurpfk , n_max_estudios , s_academica_actual ,insteducativa , anioegreso) VALUES ($1, $2 , $3 , $4 , $5 )',
        [   
            datos[2],datos[22],datos[23],datos[24],datos[25]
        ]
    );
    const response4 = await pool.query('INSERT INTO datoslaborales  (idcurpfk , nombre_institucion , direccion ,puesto , telefono) VALUES ($1, $2 , $3 , $4 , $5 )',
    [   
        datos[2],datos[22],datos[23],datos[24],datos[25]
    ]
    );


    return {"mensaje" :'Servicio agregado'};
}

module.exports = {
    Home,
    getServicios,
    getAlumnos,
    updateHabilitado,
    getCurp,
    createServicio,
    createIngreso
};
