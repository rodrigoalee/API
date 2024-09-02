const db = require('../config/db.config.js');
const Departamento = db.Departamento; 

exports.create = (req, res) => {
    let departamento = {};

    try {
        departamento.iddepartamento = req.body.iddepartamento;
        departamento.descripcion = req.body.descripcion;

        Departamento.create(departamento).then(result => {
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.iddepartamento,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el departamento!",
            error: error.message
        });
    }
};

exports.retrieveAllDepartamentos = (req, res) => {
    Departamento.findAll()
        .then(departamentoInfos => {
            res.status(200).json({
                message: "¡Departamentos obtenidos exitosamente!",
                departamentos: departamentoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los departamentos!",
                error: error
            });
        });
};

exports.getDepartamentoById = (req, res) => {
    let departamentoId = req.params.iddepartamento; // Cambiado de id_departamento a iddepartamento
    Departamento.findByPk(departamentoId)
        .then(departamento => {
            res.status(200).json({
                message: "Departamento obtenido exitosamente con id = " + departamentoId,
                departamento: departamento
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener departamento con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.iddepartamento; // Cambiado de id_departamento a iddepartamento
        let departamento = await Departamento.findByPk(departamentoId);
    
        if (!departamento) {
            res.status(404).json({
                message: "No se encontró el departamento para actualizar con id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                descripcion: req.body.descripcion
            };
            let result = await Departamento.update(updatedObject, {returning: true, where: {iddepartamento: departamentoId}}); // Cambiado de id_departamento a iddepartamento
            
            if (!result[0]) { // Ajuste aquí: result es un array con el número de filas actualizadas
                res.status(500).json({
                    message: "No se puede actualizar el departamento con id = " + req.params.iddepartamento,
                    error: "No se pudo actualizar el departamento",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del departamento con id = " + departamentoId,
                departamento: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el departamento con id = " + req.params.iddepartamento,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.iddepartamento; // Cambiado de id_departamento a iddepartamento
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe el departamento con id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del departamento con id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el departamento con id = " + req.params.iddepartamento, // Cambiado de id_departamento a iddepartamento
            error: error.message,
        });
    }
};
