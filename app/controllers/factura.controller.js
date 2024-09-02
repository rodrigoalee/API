const db = require('../config/db.config.js');
const Factura = db.Factura; 

exports.create = async (req, res) => {
    let factura = {};

    try {
        factura.id_factura = req.body.id_factura;
        factura.no_fact = req.body.no_fact;
        factura.serie = req.body.serie;
        factura.id_cliente = req.body.id_cliente;
        factura.id_empleado = req.body.id_empleado;
        factura.fecha_fac = req.body.fecha_fac;

        const result = await Factura.create(factura);
        res.status(200).json({
            message: "Factura creada exitosamente con id = " + result.id_factura,
            factura: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la factura!",
            error: error.message
        });
    }
};

exports.retrieveAllFacturas = async (req, res) => {
    try {
        const facturas = await Factura.findAll();
        res.status(200).json({
            message: "¡Facturas obtenidas exitosamente!",
            facturas: facturas
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al obtener las facturas!",
            error: error.message
        });
    }
};

exports.getFacturaById = async (req, res) => {
    const facturaId = req.params.id_factura;
    try {
        const factura = await Factura.findByPk(facturaId);
        if (factura) {
            res.status(200).json({
                message: "Factura obtenida exitosamente con id = " + facturaId,
                factura: factura
            });
        } else {
            res.status(404).json({
                message: "Factura no encontrada con id = " + facturaId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error al obtener la factura con id!",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    const facturaId = req.params.id_factura;
    try {
        const factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura para actualizar con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            const updatedObject = {
                no_fact: req.body.no_fact,
                serie: req.body.serie,
                id_cliente: req.body.id_cliente,
                id_empleado: req.body.id_empleado,
                fecha_fac: req.body.fecha_fac
            };

            await Factura.update(updatedObject, { where: { id_factura: facturaId } });
            res.status(200).json({
                message: "Actualización exitosa de la factura con id = " + facturaId,
                factura: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la factura con id = " + facturaId,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    const facturaId = req.params.id_factura;
    try {
        const factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe la factura con id = " + facturaId,
                error: "404"
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la factura con id = " + facturaId,
                factura: factura
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar la factura con id = " + facturaId,
            error: error.message
        });
    }
};
