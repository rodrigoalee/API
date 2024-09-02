let express = require('express');
let router = express.Router();

const clienteController = require('../controllers/cliente.controller.js');
const empleadoController = require('../controllers/empleado.controller.js');

router.post('/api/clientes/create', clienteController.create);
router.get('/api/clientes/all', clienteController.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id_cliente', clienteController.getClienteById);
router.put('/api/clientes/update/:id_cliente', clienteController.updateById);
router.delete('/api/clientes/delete/:id_cliente', clienteController.deleteById);

router.post('/api/empleados/create', empleadoController.create);
router.get('/api/empleados/all', empleadoController.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id_empleado', empleadoController.getEmpleadoById);
router.put('/api/empleados/update/:id_empleado', empleadoController.updateById);
router.delete('/api/empleados/delete/:id_empleado', empleadoController.deleteById);
module.exports = router;