const { Pool } = require('pg');

let json = require('../config/configApi.json');
let rutas = json['rutas'];
let conexion = json['postgresql'];

const config = {
    host:conexion[0]['host'],
    user:conexion[0]['user'],
    password:conexion[0]['password'],
    database:conexion[0]['database'],
    port:conexion[0]['port'],
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

const getServicios = async (req, res) => {
    const response = await pool.query('SELECT * FROM SERVICIOEDUCATIVO');
    var data = response.rows;
    let id =[]
    let servicio =[]
    let habilitado =[]
    data.map(row =>{
        id.push(row['idserviciosedu']);
        servicio.push(row['nombre_servicio']);
        habilitado.push(String(row['habilitado']));
    })
    res.status(200).json({"id":id, "Servicios":servicio , "habilitado":habilitado});
};
const createServicio = async (req, res) => {
    let datos = req.body;
    let servicio = datos.data.servicioNew;
    const response = await pool.query('INSERT INTO servicioeducativo  (nombre_servicio , habilitado) VALUES ($1, $2)', [servicio, 1]);
    res.json({
        message: 'Service Added successfully',
        body: {
            Servicio: {servicio}
        }
    })
};
const updateHabilitado = async (req, res) => {
    let datos = req.body;
    let id = datos.data.id;
    let newhabilitadp = datos.data.habilitado;
    const response =await pool.query('UPDATE SERVICIOEDUCATIVO SET habilitado = $1   WHERE idServiciosEdu = $2', [
        newhabilitadp,
        id,
    ]);
    res.json('User Updated Successfully');
};









const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getServicios,
    createServicio,
    updateHabilitado
};