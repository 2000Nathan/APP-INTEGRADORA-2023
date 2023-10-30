import { Sequelize  } from "sequelize";

//Conexión a la base de datos nombre de la base de datos, usuario, contraseña
const sequelize = new Sequelize('dbmicolchonsito', 'root', '2023Natan,.-', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;