import { Router } from 'express';
import * as ClassRepository from '../database/repositories/ClassRepository.js'

const app = Router();

const startupView = 'layouts/__startup'

app.get('/', (_req, res) => {
    res.render(startupView, { render: 'register', title: "Criação de Sala" })
});

app.get('/selection', async (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(400).send("'Id' in query is required!");

    try {
        const viewClass = await ClassRepository.GetClassById(id);

        if (!viewClass) return res.status(400).send('Invalid Id!');

        res.render(startupView, {
            render: 'selection',
            title: "Seleção de Grupo",
            users: viewClass.students.map(e => ({ id: e.id, name: e.name }))
        });
    } catch {
        res.status(404).send(`Invalid Id: '${id}'`)
    }
});

export default app;