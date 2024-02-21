import {Prisma, PrismaClient} from '@prisma/client'
import {User, Server, Channel} from '../interfaces'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

const addChannel = async (channel: Channel) =>
{
    if (!channel.name || !channel.type || (!channel.server && channel.type != "DM"))
        throw new BadRequest(`Invalid Channel Credentials`);

    try
    {
        if (channel.type == "PUBLIC")
        {
            const server = await prisma.server.findUnique({where: {name: channel.server}});
            if (!server)
                throw new BadRequest(`Server ${channel.server} doesn't exist`);
            const channelCreated = await prisma.channel.create({data: {name: channel.name, type: channel.type, server: {connect: {name: channel.server}}}});
            return channelCreated;
        }
        else
        {
            const members = await prisma.user.findMany({where: {userName: {in: channel.privateMembers}}});
            if (members.length != channel.privateMembers.length)
                throw new BadRequest(`Invalid Members`);
            // Check if there is an existing DM channel between the members
            const existedChannel = !! await prisma.channel.findFirst({where: {AND: [{type: "DM"}, {privateMembers: {every: {userName: {in: channel.privateMembers}}}}]}});
            if (existedChannel)
                throw new BadRequest(`DM Channel already exists`);
            const channelCreated = await prisma.channel.create({data: {name: channel.name, type: channel.type, privateMembers: {connect: members.map(member => {return {userName: member.userName}})}}});
            return channelCreated;
        }
    }
    catch (exc)
    {
        if (exc instanceof Prisma.PrismaClientValidationError)
            throw new BadRequest(`Channel validation failed`);
        else if (exc instanceof Prisma.PrismaClientKnownRequestError)
            throw new BadRequest(`Invalid Channel: ${exc.meta?.target} already exists`);
        else
            throw new BadRequest(`Invalid Channel`);
    }
}