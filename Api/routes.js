const express = require('express');
const { Pool  } = require('pg');
const routes = express.Router();

/*
 *Obtenemos la configuracion de la base de datos  
 */
let json = require('./config/configApi.json');
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
routes.post('/Api/Form0' , (req, res , next)=> {
    let datos = req.body;
    //console.log(datos.data['curp']);
    console.log(datos);
    res.json({ "status": 200});
});


//Obtenemos Servicio educativo
routes.get('/ServEducativo' , (req, res)=> {
    const pool = new Pool(config);
    pool.connect();
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



// app.get('/' , (req , res) => {
//     console.log("Obtenemos los datos");
//     console.log(configuration);
//     res.json({
//         message : "Lista de usuarios",
//         body :"Hola Mundo"
//     });
// });


module.exports = routes;