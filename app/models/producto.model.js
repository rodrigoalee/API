module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto', {
        id_producto: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        },
        stock_minimo: {
            type: Sequelize.INTEGER
        },
        precio_unitario: {
            type: Sequelize.FLOAT
        },
        id_proveedor: {
            type: Sequelize.INTEGER,
            references: {
                model: 'proveedors',  
                key: 'id_proveedor'
            }
        }
    });

    return Producto;
}
