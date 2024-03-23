import {Prisma, PrismaClient} from '@prisma/client'
import {Message} from '../dtos'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

export const addMessage = async (message: Message) =>
{
    try
    {
        const messageCreated = await prisma.message.create({data: {content: message.content, sender: {connect: {userName: message.sender}}, channel: {connect: {id: message.channel}}, date: message.date}});
        const channelMembers = await prisma.channel.findUnique({where: {id: message.channel}, include: {privateMembers: true}});
        if (channelMembers)
        {
            const members = channelMembers?.privateMembers.map(member => member.id);
            for (const member of members)
            {
                const user = await prisma.user.update({where: {id: member}, data: {messages: {connect: {id: messageCreated.id}}}});
            }
        }

        return messageCreated;
    }
    catch (err)
    {
        throw err;
    }
}