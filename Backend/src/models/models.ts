import {Prisma, PrismaClient} from '@prisma/client'
import {User, Server} from '../interfaces'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

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
            throw new BadRequest(`Invalid User: ${exc.meta?.target}`);
        else
            throw new BadRequest(`Invalid User`);
    }
}