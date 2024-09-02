const db = require('../config/db.config.js');
const Empleado = db.Empleado;

// Crear un nuevo empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        // Asignar valores del cuerpo de la solicitud al objeto empleado
        empleado.primernombre = req.body.primernombre;
        empleado.segundonombre = req.body.segundonombre;
        empleado.primerapellido = req.body.primerapellido;
        empleado.segundoapellido = req.body.segundoapellido;
        empleado.nit = req.body.nit;
        empleado.salario = req.body.salario;
        empleado.estatus = req.body.estatus;
        empleado.iddepartamento = req.body.iddepartamento;

        // Guardar el empleado en la base de datos
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al crear el empleado!",
            error: error.message
        });
    }
};

// Recuperar todos los empleados
exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfos => {
            res.status(200).json({
                message: "Información de todos los empleados obtenida exitosamente",
                empleados: empleadoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los empleados!",
                error: error
            });
        });
};

// Recuperar un empleado por ID
exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            res.status(200).json({
                message: "Empleado obtenido exitosamente con id = " + empleadoId,
                empleado: empleado
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el empleado!",
                error: error
            });
        });
};

// Actualizar un empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró el empleado con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                primer_nombre: req.body.primernombre,
                segundo_nombre: req.body.segundonombre,
                primer_apellido: req.body.primerapellido,
                segundo_apellido: req.body.segundoapellido,
                nit: req.body.nit,
                salario: req.body.salario,
                estatus: req.body.estatus,
                iddepartamento: req.body.iddepartamento
            };

            let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

            if (!result) {
                res.status(500).json({
                    message: "¡Error! No se pudo actualizar el empleado con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se pudo actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un empleado por ID
exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se pudo eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};