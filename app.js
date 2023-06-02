import express from 'express';

import { renderFile } from 'ejs';

import apiRoute from './routes/api.js';
import viewRoute from './routes/view.js';

const app = express();

app.engine('ejs', renderFile);

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(express.json());

app.use('/', viewRoute);
app.use('/api', apiRoute);

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));