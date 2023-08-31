import  pkg  from 'pg';
const {Pool} = pkg;
import Sequelize from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { db } from './Config.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

const sequelizeClient = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return new Sequelize(db.database, db.user, db.password, {
                host: db.host,
                dialect: 'postgres',
            });

        case 'test':
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });

        default:
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });
    }
})();
sequelizeClient.sync({alter: true})
.then(() => {
    console.log('Conectado')
})
.catch(() => {
    console.log('No se conecto')
});

export const getData = {sequelizeClient}  ;