import {Prisma, PrismaClient} from '@prisma/client'
import {Message} from '../dtos'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

export const addMessage = async (message: Message) =>
{
    try
    {
        const messageCreated = await prisma.message.create({data: {content: message.content, sender: {connect: {userName: message.sender}}, channel: {connect: {id: message.channel}}, date: message.date}});
        return messageCreated;
    }
    catch (err)
    {
        throw err;
    }
}