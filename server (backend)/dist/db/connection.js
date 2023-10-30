"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Conexión a la base de datos nombre de la base de datos, usuario, contraseña
const sequelize = new sequelize_1.Sequelize('dbmicolchonsito', 'root', '2023Natan,.-', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
