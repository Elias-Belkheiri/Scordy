import express from 'express' 
import {BadRequest} from '../customExceptions'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { User } from '../dtos';
import * as authService from '../services/authService'

const router = express.Router();

router.post("/login", async (req, res) => {
    try
    {
        const user = req.body;

        const {foundUser , token} = await authService.loginUser(user);
        res.header('Authorization', `Bearer: ${token}`);
        res.json({...foundUser, password: undefined});
    }
    catch (err)
    {
        if (err instanceof BadRequest)
            res.status(400).send(err.message);
        else
            res.status(400).send('Invalid request');
    }
})

router.post("/register", async (req, res) => {
    try
    {
        const user: User = req.body;
        const newUser = await authService.registerUser(user);
        res.status(201).json(newUser);
    }
    catch (err)
    {
        if (err instanceof BadRequest)
            res.status(400).send(err.message);
        else
            res.status(400).send('Invalid request');
    }

})

export {router as authRouter};