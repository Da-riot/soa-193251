import { getData } from '../config/db.js';
import { DataTypes } from 'sequelize';

const Local = getData.sequelizeClient.define('cat_tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaCreacion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
},
{
    tableName: 'cat_tareas',
    freezeTableName: true,
    timestamps: true,
});
export const getLocal = Local;