import {BadRequest} from '../customExceptions'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { User } from '../dtos';
import * as userService from '../services/userService'
import { Request, Response, NextFunction } from 'express';
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const SECRET = 'secret';

export const registerUser = async (user: User) => {
    try
    {
        if (!user.firstName || !user.lastName || !user.userName || !user.email || !user.password)
            throw new BadRequest('Required fields are missing');

        const users = await userService.getUsers();
        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === user.userName)
                throw new BadRequest('Username already exists');
            if (users[i].email === user.email)
                throw new BadRequest('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await userService.addUser({...user, password: hashedPassword});
        // return user except password;
        return {...newUser, password: undefined};
    }
    catch (err)
    {
        throw err
    }

}

export const loginUser = async (user: User) => {
    try
    {
        if (!user.userName || !user.password)
            throw new BadRequest('Username and password are required');

        const foundUser = await prisma.user.findUnique({where: {userName: user.userName}});
        if (!foundUser)
            throw new BadRequest('Incorrect username');
        const validPassword = await bcrypt.compare(user.password, foundUser.password);
        if (!validPassword)
            throw new BadRequest('Incorrect password');

        const token = jwt.sign({user: {userName: foundUser.userName}}, SECRET);
        return {foundUser, token};
    }
    catch (err)
    {
        throw err;
    }
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const token = req.headers['authorization']?.replace('Bearer: ', '');
    
        if (!token)
            throw new BadRequest('Access denied');
    
        const payload = jwt.verify(token, SECRET);
        req.body.user = payload;
        console.log("payload: ", payload);
        next();
    }
    catch (err)
    {
        return res.status(401).send('Access denied');
    }

}