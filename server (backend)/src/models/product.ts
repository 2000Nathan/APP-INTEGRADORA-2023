import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

// Definimos un modelo para la tabla 'Product' que extiende el modelo 'Model' de sequelize y define los campos de la tabla (como propiedades) y sus tipos de datos
export const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    
});
