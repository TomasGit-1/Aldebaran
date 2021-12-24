const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const app = express();
app.set('port' , process.env.PORT || 5000)


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(fileUpload());
// app.use(busboy());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
// Routes
app.use(require('./routes/index.routes'));

app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en http://localhost:' + app.get('port'));
});
