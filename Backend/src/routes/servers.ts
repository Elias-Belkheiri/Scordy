import {servers} from '../models/models';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(servers);
});

router.get('/:id', (req, res) => {
    const server = servers.find(s => s.id === parseInt(req.params.id));
    if (!server) res.status(404).send('The server with the given ID was not found.');
    res.send(server);
});

export default router;