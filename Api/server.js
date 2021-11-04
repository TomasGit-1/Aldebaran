const express = require('express');
const routes  = require('./routes');

//const configuration = require('config/confiApi.json');

const app = express();
//const PORT = 3000;

app.set('port' , process.env.PORT || 3000)
// req = request
// res = response

app.use('/' , routes)

app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en http://localhost:' + app.get('port'));
});