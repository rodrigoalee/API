let express = require('express');
let router = express.Router();

const clienteController = require('../controllers/cliente.controller.js');
const empleadoController = require('../controllers/empleado.controller.js');
const departamentoController = require('../controllers/departamento.controller.js');
const proveedorController = require('../controllers/proveedor.controller.js');
const productoController = require('../controllers/producto.controller.js');
const facturaController = require('../controllers/factura.controller.js'); 
const detalleController = require('../controllers/detalle.controller.js');


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


router.post('/api/departamentos/create', departamentoController.create);
router.get('/api/departamentos/all', departamentoController.retrieveAllDepartamentos);
router.get('/api/departamentos/onebyid/:id_departamento', departamentoController.getDepartamentoById);
router.put('/api/departamentos/update/:id_departamento', departamentoController.updateById);
router.delete('/api/departamentos/delete/:id_departamento', departamentoController.deleteById);


router.post('/api/proveedores/create', proveedorController.create);
router.get('/api/proveedores/all', proveedorController.retrieveAllProveedores);
router.get('/api/proveedores/onebyid/:id_proveedor', proveedorController.getProveedorById);
router.put('/api/proveedores/update/:id_proveedor', proveedorController.updateById);
router.delete('/api/proveedores/delete/:id_proveedor', proveedorController.deleteById);


router.post('/api/productos/create', productoController.create);
router.get('/api/productos/all', productoController.retrieveAllProductos);
router.get('/api/productos/onebyid/:id_producto', productoController.getProductoById);
router.put('/api/productos/update/:id_producto', productoController.updateById);
router.delete('/api/productos/delete/:id_producto', productoController.deleteById);


router.post('/api/facturas/create', facturaController.create);
router.get('/api/facturas/all', facturaController.retrieveAllFacturas);
router.get('/api/facturas/onebyid/:id_factura', facturaController.getFacturaById);
router.put('/api/facturas/update/:id_factura', facturaController.updateById);
router.delete('/api/facturas/delete/:id_factura', facturaController.deleteById);

router.post('/api/detalles/create', detalleController.create);
router.get('/api/detalles/all', detalleController.retrieveAllDetalles);
router.get('/api/detalles/onebyid/:id', detalleController.getDetalleById);
router.put('/api/detalles/update/:id', detalleController.updateById);
router.delete('/api/detalles/delete/:id', detalleController.deleteById);

module.exports = router;
