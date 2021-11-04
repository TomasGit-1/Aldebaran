const express = require('express');
const routes = express.Router();


// Aqui va toda la logica
routes.get('/' , (req, res)=> {
    res.send('testing Api');
});

// Aqui va toda la logica
routes.get('/Api' , (req, res)=> {
    res.send(' Api');
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