const express = require('express');
const fileUpload = require('express-fileupload');
const routes  = require('./routes');
const cors = require('cors');
//const configuration = require('config/confiApi.json');

const app = express();
//const PORT = 3000;

app.set('port' , process.env.PORT || 5858)
app.use(cors())
// req = request
// res = response
// app.use(fileUpload());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use('/' , routes)


// Configurar cabeceras y cors


app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en http://localhost:' + app.get('port'));
});
