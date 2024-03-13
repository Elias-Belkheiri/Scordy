import {Prisma, PrismaClient} from '@prisma/client'
import {Message} from '../dtos'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

export const addMessage = async (message: Message) => 
{
    try
    {
        const sender = await prisma.user.findUnique({where: {userName: message.sender}})
        if (!sender)
            throw new BadRequest("Sender not found")

        const channel = await prisma.channel.findUnique({where: {name: message.channel}})
        if (!channel)
            throw new BadRequest("Channel not found")
    }
    catch (e)
    {
        throw e
    }
}