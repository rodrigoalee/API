module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        id_empleado: {
            type: Sequelize.INTEGER,autoIncrement: true,primaryKey: true},
        primernombre: {
            type: Sequelize.STRING},
        segundonombre: {
            type: Sequelize.STRING},
        primerapellido: {
            type: Sequelize.STRING},
        segundoapellido: {
            type: Sequelize.STRING},
        nit: {
            type: Sequelize.STRING},
        salario: {
            type: Sequelize.INTEGER},
        estatus: {
            type: Sequelize.INTEGER},
        iddepartamento: {
            type: Sequelize.INTEGER,
            references: {
                model: 'departamentos', 
                key: 'iddepartamento'
            }
        }
    });

    return Empleado;
}
