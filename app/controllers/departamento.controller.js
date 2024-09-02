const db = require('../config/db.config.js');
const Departamento = db.Departamento;

// Crear un nuevo departamento
exports.create = (req, res) => {
    let departamento = {
        iddepartamento: req.body.iddepartamento,
        descripcion: req.body.descripcion
    };

    Departamento.create(departamento)
        .then(result => {
            res.status(201).json({
                message: "Departamento creado exitosamente con id = " + result.iddepartamento,
                departamento: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al crear el departamento",
                error: error.message
            });
        });
};

// Recuperar todos los departamentos
exports.retrieveAllDepartamentos = (req, res) => {
    Departamento.findAll()
        .then(departamentos => {
            res.status(200).json({
                message: "Información de los Departamentos obtenida exitosamente",
                departamentos: departamentos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los departamentos",
                error: error.message
            });
        });
};

// Recuperar un departamento por ID
exports.getDepartamentoById = (req, res) => {
    let departamentoId = req.params.id;
    Departamento.findByPk(departamentoId)
        .then(departamento => {
            if (!departamento) {
                return res.status(404).json({
                    message: "No se encontró el Departamento con id = " + departamentoId
                });
            }
            res.status(200).json({
                message: "Departamento obtenido exitosamente",
                departamento: departamento
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el departamento",
                error: error.message
            });
        });
};

// Actualizar un departamento por ID
exports.updateById = async (req, res) => {
    const departamentoId = req.params.id;
    try {
        const [updated] = await Departamento.update(req.body, {
            where: { iddepartamento: departamentoId }
        });
        if (updated) {
            const updatedDepartamento = await Departamento.findByPk(departamentoId);
            res.status(200).json({
                message: "Departamento actualizado exitosamente",
                departamento: updatedDepartamento,
            });
        } else {
            res.status(404).json({
                message: "No se encontró el Departamento con id = " + departamentoId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el departamento",
            error: error.message
        });
    }
};

// Eliminar un departamento por ID
exports.deleteById = async (req, res) => {
    const departamentoId = req.params.id;
    try {
        const deleted = await Departamento.destroy({
            where: { iddepartamento: departamentoId }
        });
        if (deleted) {
            res.status(200).json({
                message: "Departamento eliminado exitosamente",
                id: departamentoId
            });
        } else {
            res.status(404).json({
                message: "No se encontró el Departamento con id = " + departamentoId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el departamento",
            error: error.message
        });
    }
};