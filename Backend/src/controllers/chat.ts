import express from 'express'
import {BadRequest} from '../customExceptions'
import {Channel, Message} from '../dtos'
import {addMessage} from '../services/channelService'
import { WebSocketServer } from 'ws';
import * as UserService from '../services/userService'

const router = express.Router();
const wss = new WebSocketServer({ port: 8080 });

const channels = new Map<number, WebSocket[]> ();
const users = new Set<any> ();

const addUserChannels = (sender: any, message: Message, ws: any) => 
{
    const serverChannels = sender.servers?.map(server => server.channels.map((channel) => channel.id)).flat();
    const dms = sender.privateChannels?.map(channel => channel.id);
    if (serverChannels)
    {
        for (const channel of serverChannels)
            channels[channel].push(ws);
    }
    if (dms)
    {
        for (const channel of dms)
            channels[channel].push(ws);
    }
}

wss.on('connection', (ws) => {
    ws.on('message', async (msg) => {
        try
        {
            const message: Message = JSON.parse(msg.toString());
            const sender = await UserService.getUser(message.sender);
            if (!sender)
                throw new BadRequest(`Sender ${message.sender} doesn't exist`);
            if (!users.has(ws))
            {
                addUserChannels(sender, message, ws);
                users.add(ws);
            }
            if (!channels[message.channel])
                throw new BadRequest(`Channel ${message.channel} doesn't exist`);
            for (const user of channels[message.channel])
            {
                if (user.readyState !== user.OPEN)
                    channels[message.channel].delete(user);
                else if (user !== ws)
                    user.send(JSON.stringify(message));
            }
        }
        catch (e)
        {
            ws.send(JSON.stringify({error: e.message}));
            ws.close();
            users.delete(ws);
        }
    });
    ws.on('close', () => {
        users.delete(ws);
    })
    ws.send('something');
});