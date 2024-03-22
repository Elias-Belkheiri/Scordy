import {Prisma, PrismaClient} from '@prisma/client'
import {User, Server} from '../dtos'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();


export const getUsers = async () =>
{
    const users =  await prisma.user.findMany();
    return users.map(user => ({...user, password: undefined}));
}

export const addUser = async (user: User) =>
{
    if (!user.firstName || !user.lastName || !user.email || !user.userName || !user.password)
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
        const user = await prisma.user.findUnique({where: {userName}, include: {privateChannels: true ,servers: {include: {channels: true}}}});
        return {...user, password: undefined};
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
        return  {...userUpdated, password: undefined};
    }
    catch (exc)
    {
        if (exc instanceof Prisma.PrismaClientValidationError)
            throw new BadRequest(`User validation failed`);
        else
            throw new BadRequest(`Invalid User`);
    }
}

export const deleteUser = async (userName: string) =>
{
    try
    {
        const   userDeleted = await prisma.user.delete({where: {userName}});
        return  {...userDeleted, password: undefined};
    }
    catch (exc)
    {
        throw new BadRequest(`Invalid User`);
    }
}