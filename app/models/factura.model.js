module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        id_factura: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        no_fact: {
            type: Sequelize.INTEGER
        },
        serie: {
            type: Sequelize.STRING,
            allowNull: true,
            length: 20
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',  
                key: 'id_cliente'
            }
        },
        id_empleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empleados',  
                key: 'id_empleado'
            }
        }
    });

    return Factura;
};
