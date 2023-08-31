import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import { getLocal } from '../models/local.js';
import { Op } from 'sequelize';

const local_viewAll = async (req, res) => {
    getLocal
        .findAll({ where: { estado: { [Op.ne]: 'eliminado' } } })
        .then((contenido) => {
            res.send(contenido);
        })
        .catch((err) => {
            res.status(400).json({ error: 'Error al obtener los registros' });
        });
};

const local_viewById = async (req, res) => {
    getLocal.findAll({ where: { id: req.query.id },
        attributes: ["titulo","descripcion","fechaCreacion","estado"] })
    
    .then(contenido => {
        res.send(contenido)
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });    
    })
    
};


const local_create = async (req, res) => {
    const { titulo, descripcion, fechaCreacion, estado } = req.body;

    getLocal
        .create({
            titulo:titulo,
            descripcion:descripcion,
            fechaCreacion:fechaCreacion,
            estado:estado,
        })
        .then((contenido) => {
            res.send(contenido);
        })
        .catch((err) => {
            console.error(err); 
            res.status(400).json({ error: 'Error al crear el registro' });
        });
};

const local_update = async (req, res) => {
    const { id, estado } = req.body;

    try {
        const updatedLocal = await getLocal.update(
            {
                estado: estado,
            },
            { where: { id: id }, returning: true } // Agregamos el returning: true para obtener el registro actualizado
        );

        if (updatedLocal[0] === 1) { 
            res.send(updatedLocal[1][0]);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el registro' });
    }
};


const local_delete = async (req, res) => {
    const id = req.body.id;
    const fechaEliminacion = new Date(); 
    try {
        await getLocal.update(
            {   
                estado:'eliminado',
                fechaEliminacion: fechaEliminacion,
            },
            {
                where: { id: id },
            }
        );

        res.status(200).json({ message: 'Registro Eliminado' });
    } catch (err) {
        res.status(400).json({ err: 'Error al eliminar' });
    }
};


export const localController = {local_viewAll, local_create, local_update, local_delete, local_viewById};