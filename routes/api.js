import { Router } from 'express';

import * as ClassRepository from '../database/repositories/ClassRepository.js';
import * as StudentyRepository from '../database/repositories/StudentRepository.js';

const app = Router();

app.post('/group', async (req, res) => {
    const { names } = req.body;

    if (!names) return res.status(400).json({ msg: "'Names' is required!" })
    if (names.length < 6) return res.status(400).json({ msg: "Is required on minums 5 names!" });

    const ClassModel = await ClassRepository.CreateClass(
        String(Math.floor(Math.random() * 1000)),
        names
    )

    res.json({
        id: ClassModel._id,
        name: ClassModel.name,
        students: ClassModel.students
    });
});

app.get('/group/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "'id' param is required" });

    const ClassModel = await ClassRepository.GetClassById(id);

    res.json({
        id: ClassModel._id,
        name: ClassModel.name,
        students: ClassModel.students
    });
});

app.put('/users/:id', async (req, res) => {
    const studentId = req.params.id;
    const { favorites } = req.body;

    if (!studentId) return res.status(400).send('Id param in required!');

    const student = await StudentyRepository.GetStudentsById(studentId);

    if (!student) return res.status(404).send(`Invalid user id: ${studentId}`);

    const errosList = [];

    const afinities = favorites.map(async id => {
        const user = await StudentyRepository.GetStudentsById(id);

        if (!user) return errosList.push('Invalid id:' + id);

        return user.id;
    });

    if (errosList.length > 0) {
        res.status(400).json(errosList);
        return;
    }

    await Promise.all(afinities).then(async v => {
        student.afinities = v;

        await student.save();

        res.status(200).json({ msg: 'Tudo ok!' });
    });
});

export default app;