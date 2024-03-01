import {User, Server, Message, Channel} from '../dtos';
import {BadRequest} from '../customExceptions'
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export  const addServer = async (server: Server) => {
    if (!server.name)
        throw new BadRequest('Server name is required')

    try
    {
        const serverCreated = await prisma.server.create({data: server});
        return serverCreated;
    }
    catch (e)
    {
        throw new BadRequest("Error creating server");
    }
}

export const getServers = async () => {
    try
    {
        const servers = await prisma.server.findMany();
        return servers;
    }
    catch (e)
    {
        throw new BadRequest("Error getting servers");
    }
}

export const getServer = async (name: string) => {
    try
    {
        const server = await prisma.server.findUnique({where: {name}});
        return server;
    }
    catch (e)
    {
        throw new BadRequest("Error getting server: " + name);
    }
}

export const updateServer = async (server: Server, name: string) => {
    try
    {
        const serverUpdated = await prisma.server.update({where: {name}, data: server});
        return serverUpdated;
    }
    catch (e)
    {
        throw new BadRequest("Error updating server: " + name);
    }
}

export const deleteServer = async (name: string) => {
    try
    {
        const serverDeleted = await prisma.server.delete({where: {name}});
        return serverDeleted;
    }
    catch (e)
    {
        throw new BadRequest("Error deleting server: " + name);
    }
}