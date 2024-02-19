import express from 'express';
import {BadRequest} from '../customExceptions'
import {addUser} from '../models/models'

const router = express.Router();

// router.get('/', async (req, res) => {
//     res.send(await getUsers());
// });

router.post("/", async (req, res) => {
    try
    {
        const user = await addUser(req.body);
        res.json(user);
    }
    catch (err)
    {
        res.status(400);
        if (err instanceof BadRequest)
            res.send(err.message);
        else
            res.send("Invalid Request");
    }

})
// router.get('/:id', (req, res) => {
//     const server = servers.find(s => s.id === parseInt(req.params.id));
//     if (!server) res.status(404).send('The server with the given ID was not found.');
//     res.send(server);
// });

export {router as usersRouter};