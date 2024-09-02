const db = require('../config/db.config.js');
const Detalle = db.Detalle;

exports.create = (req, res) => {
    let detalle = {};

    try {
        detalle.id_factura = req.body.id_factura;
        detalle.id_producto = req.body.id_producto;
        detalle.cantidad = req.body.cantidad;

        Detalle.create(detalle).then(result => {
            res.status(200).json({
                message: "Detalle creado exitosamente con id_linea = " + result.id_linea,
                detalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el detalle!",
            error: error.message
        });
    }
};

exports.retrieveAllDetalles = (req, res) => {
    Detalle.findAll()
        .then(detalleInfos => {
            res.status(200).json({
                message: "¡Detalles obtenidos exitosamente!",
                detalles: detalleInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los detalles!",
                error: error
            });
        });
};

exports.getDetalleById = (req, res) => {
    let detalleId = req.params.id;
    Detalle.findByPk(detalleId)
        .then(detalle => {
            res.status(200).json({
                message: "Detalle obtenido exitosamente con id_linea = " + detalleId,
                detalle: detalle
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el detalle con id_linea!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await Detalle.findByPk(detalleId);
    
        if (!detalle) {
            res.status(404).json({
                message: "No se encontró el detalle para actualizar con id_linea = " + detalleId,
                detalle: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                id_factura: req.body.id_factura,
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad
            }
            let result = await Detalle.update(updatedObject, {returning: true, where: {id_linea: detalleId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un detalle con id_linea = " + req.params.id,
                    error: "No se pudo actualizar el detalle",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un detalle con id_linea = " + detalleId,
                detalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un detalle con id_linea = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await Detalle.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No existe el detalle con id_linea = " + detalleId,
                error: "404",
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del detalle con id_linea = " + detalleId,
                detalle: detalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un detalle con id_linea = " + req.params.id,
            error: error.message,
        });
    }
};
