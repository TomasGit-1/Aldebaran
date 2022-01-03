const express = require('express');
const fileUpload = require('express-fileupload');
const routes  = require('./routes/routes');
const cors = require('cors');
const app = express();

app.set('port' , process.env.PORT || 5000)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header("Content-Type", "application/json");
	// res.writeHeader(200, { 'Content-Type': 'application/json' });
	// res.write(JSON.stringify(object));
	// res.end()
	next();
});
app.use('/api' , routes)

app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en http://localhost:' + app.get('port'));
});
