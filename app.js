import express from 'express';
import { api } from './config/Config.js';
import tareas from './router/local.Router.js'
import login from './router/login.Router.js'
import cors from 'cors';

const app = express();
app.use(express.json());

app.use('/api_v1/tareas',tareas);
app.use('/api_v1/login',login)
app.use(cors({origin: true, credentials: true}));

app.listen(api.port, () => {
    console.log('server running on port =>', api.port);
});