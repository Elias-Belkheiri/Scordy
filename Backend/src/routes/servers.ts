import express from 'express';
import {BadRequest} from '../customExceptions'
import * as Server from '../models/serverModel'

const router = express.Router();

router.post("/", async (req, res) => {
    try
    {
        const server = await Server.addServer(req.body);
        res.json(server);
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

router.get("/", async (req, res) => {
    try
    {
        const servers = await Server.getServers();
        res.json(servers);
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

router.get('/:name', async (req, res) => {
    try
    {
        const server = await Server.getServer(req.params.name);
        if (!server)
            throw new BadRequest(`Server ${req.params.name} doesn't exist`);
        res.json(server);
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

router.patch("/:name", async (req, res) => {
    try
    {
        const server = await Server.updateServer(req.body, req.params.name);
        res.json(server);
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

router.delete("/:name", async (req, res) => {
    try
    {
        const server = await Server.deleteServer(req.params.name);
        res.json(server);
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

export {router as serversRouter};