module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define('departamento', {
        iddepartamento: {
            type: Sequelize.INTEGER, autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return Departamento;
}
