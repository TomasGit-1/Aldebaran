const { Router } = require('express');
const router = Router();

const { getServicios , createServicio , updateHabilitado , Home , createRegistro} = require('../controllers/index.controller');

router.get('/', Home);
router.get('/Servicios', getServicios);
router.post('/createServicio', createServicio);
router.post('/HaDesa_bilitar', updateHabilitado);
router.post('/createRegistro', createRegistro);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser)
// router.delete('/users/:id', deleteUser);

module.exports = router;