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
                model: 'clientes',  // Asegúrate de que este nombre coincida con el nombre de la tabla en la base de datos
                key: 'id_cliente'
            }
        },
        id_empleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empleados',  // Asegúrate de que este nombre coincida con el nombre de la tabla en la base de datos
                key: 'id_empleado'
            }
        }
    });

    return Factura;
};
