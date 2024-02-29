import express from 'express';
import {BadRequest} from '../customExceptions'
import * as User from '../services/userService'

const router = express.Router();

router.post("/", async (req, res) => {
    try
    {
        const user = await User.addUser(req.body);
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

router.get("/", async (req, res) => {
    try
    {
        const users = await User.getUsers();
        res.json(users);
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

router.get('/:userName', async (req, res) => {
    try
    {
        const user = await User.getUser(req.params.userName);
        if (!user)
            throw new BadRequest(`User ${req.params.userName} doesn't exist`);
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

router.patch("/:userName", async (req, res) => {
    try
    {
        const user = await User.updateUser(req.body, req.params.userName);
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

router.delete("/:userName", async (req, res) => {
    try
    {
        const user = await User.deleteUser(req.params.userName);
        res.json(user);
    }
    catch (err)
    {
        res.status(400).send("Invalid Request");
    }
})

export {router as usersRouter};