import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

// Definimos un modelo para la tabla 'User' que extiende el modelo 'Model' de sequelize y define los campos de la tabla (como propiedades) y sus tipos de datos
export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,   
    },
    
});
