module.exports = (sequelize, Sequelize) => {

    const Detalle = sequelize.define("detalle", {
        id_linea: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_factura: {
            type: Sequelize.INTEGER
        },
        id_producto: {
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER,
        }
    });
    return Detalle;
};