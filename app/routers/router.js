let express = require('express');
let router = express.Router();

const clienteController = require('../controllers/cliente.controller.js');

router.post('/api/clientes/create', clienteController.create);
router.get('/api/clientes/all', clienteController.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id_cliente', clienteController.getClienteById);
router.put('/api/clientes/update/:id_cliente', clienteController.updateById);
router.delete('/api/clientes/delete/:id_cliente', clienteController.deleteById);

module.exports = router;