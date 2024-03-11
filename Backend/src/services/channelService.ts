import {Prisma, PrismaClient} from '@prisma/client'
import {User, Server, Channel} from '../dtos'
import {BadRequest} from '../customExceptions'

// Server Channel: /servername/, and a body with the channel name and type
// DM Channel: dms/, and a body with the members

const prisma = new PrismaClient();

const addChannel = async (channel: Channel) =>
{
    if (!channel.name || !channel.type || (!channel.server && channel.type != "DM"))
        throw new BadRequest(`Invalid Channel Credentials`);

    try
    {
        if (channel.type == "PUBLIC")
        {
            const server = await prisma.server.findUnique({where: {name: channel.server}, include: {channels: true}});
            if (!server)
                throw new BadRequest(`Server ${channel.server} doesn't exist`);

            const serverChannels = (server.channels).filter(serverChannel => serverChannel.name == channel.name);
            if (serverChannels.length)
                throw new BadRequest(`Channel ${channel.name} already exists in ${channel.server}`);
            const channelCreated = await prisma.channel.create({data: {name: channel.name, type: channel.type, server: {connect: {name: channel.server}}}});
            return channelCreated;
        }
        else if (channel.type == "DM")
        {
            const members = await prisma.user.findMany({where: {userName: {in: channel.privateMembers}}});
            if (members.length != 2)
                throw new BadRequest(`Invalid Members`);
            // Check if there is an existing DM channel between the members
            const existedChannel = !! await prisma.channel.findFirst({where: {AND: [{type: "DM"}, {privateMembers: {every: {userName: {in: channel.privateMembers}}}}]}});
            if (existedChannel)
                throw new BadRequest(`DM Channel already exists`);
            const channelCreated = await prisma.channel.create({data: {type: channel.type, name: `${members[0].userName}-${members[1].userName}`, privateMembers: {connect: members.map(member => {return {userName: member.userName}})}}});
            return channelCreated;
        }
        else if (channel.type == "PRIVATE")
        {
            const server = await prisma.server.findUnique({where: {name: channel.server}, include: {channels: true}});
            if (!server)
                throw new BadRequest(`Server ${channel.server} doesn't exist`);

            const serverChannels = (server.channels).filter(serverChannel => serverChannel.name == channel.name);
            if (serverChannels.length)
                throw new BadRequest(`Channel ${channel.name} already exists in ${channel.server}`);
        
            const members = await prisma.user.findMany({where: {userName: {in: channel.privateMembers}}});
            if (members.length != channel.privateMembers.length)
                throw new BadRequest(`Invalid Members`);
            const channelCreated = await prisma.channel.create({data: {name: channel.name, type: channel.type, server: {connect: {name: channel.server}}, privateMembers: {connect: members.map(member => {return {userName: member.userName}})}}});
            return channelCreated;
        }
    }
    catch (err)
    {
        throw err
    }
}

const deleteServerChannel = async (channelName: string, serverName: string) =>
{
    try
    {
        const server = await prisma.server.findUnique({where: {name: serverName}, select: {channels: {where: {name: channelName}, include: {privateMembers: true, messages: true}}}});
        if (!server)
            throw new BadRequest(`Server ${serverName} doesn't exist`);
        const channel: Channel = {...server.channels[0], server: undefined};
        if (!channel)
            throw new BadRequest(`Channel ${channelName} doesn't exist in ${serverName}`);
        const privateMembers: string[] = channel.privateMembers.map(member => member.userName);
        // Disconnect from related records
        await prisma.channel.update({where: {id: channel[0].id}, data: {server: {disconnect: {name: serverName}}}});
        await prisma.channel.update({where: {id: channel[0].id}, data: {privateMembers: {disconnect: privateMembers.map(member => {return {userName: member}})}}});
    }
    catch (err)
    {
        throw err;
    }
}