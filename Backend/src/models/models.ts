import {Prisma, PrismaClient} from '@prisma/client'
import {User, Server} from '../interfaces'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();


export const getUsers = async () =>
{
    return await prisma.user.findMany();
}

export const addUser = async (user: User) =>
{
    if (!user.fullName || !user.email || !user.userName || !user.password)
        throw new BadRequest(`Invalid User Credentials`);
    try
    {
        const   userCreated = await prisma.user.create({data: user});
        return  userCreated;
    }
    catch (exc)
    {
        if (exc instanceof Prisma.PrismaClientValidationError)
            throw new BadRequest(`User validation failed`);
        if (exc instanceof Prisma.PrismaClientKnownRequestError)
            throw new BadRequest(`Invalid User: ${exc.meta?.target} already exists`);
        else
            throw new BadRequest(`Invalid User`);
    }
}

export const getUser = async (userName: string) =>
{
    try
    {
        const user = await prisma.user.findUnique({where: {userName}});
        return user;
    }
    catch (exc)
    {
        throw new BadRequest(`Invalid userName`);
    }
}

export const updateUser = async (user: User, userName: string) =>
{
    try
    {
        const   userUpdated = await prisma.user.update({where: {userName}, data: user});
        return  userUpdated;
    }
    catch (exc)
    {
        if (exc instanceof Prisma.PrismaClientValidationError)
            throw new BadRequest(`User validation failed`);
        if (exc instanceof Prisma.PrismaClientKnownRequestError)
            throw new BadRequest(`Invalid User: ${exc.meta?.target} already exists`);
        else
            throw new BadRequest(`Invalid User`);
    }
}

export const deleteUser = async (userName: string) =>
{
    try
    {
        const   userDeleted = await prisma.user.delete({where: {userName}});
        return  userDeleted;
    }
    catch (exc)
    {
        throw new BadRequest(`Invalid User`);
    }
}