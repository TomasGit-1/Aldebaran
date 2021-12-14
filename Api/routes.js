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




// app.get('/' , (req , res) => {
//     console.log("Obtenemos los datos");
//     console.log(configuration);
//     res.json({
//         message : "Lista de usuarios",
//         body :"Hola Mundo"
//     });
// });


module.exports = routes;