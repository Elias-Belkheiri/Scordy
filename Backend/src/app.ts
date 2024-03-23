// import express from 'express';
// import {usersRouter} from './controllers/users';
// import { authRouter } from './controllers/auth';
// import { authorize } from './services/authService';
// import { serversRouter } from './controllers/servers';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use('/auth', authRouter);

// app.use('/users', authorize);
// app.use('/users', usersRouter);
// app.use('/servers', serversRouter);

// // app.post('/', (req, res) => {
// //   res.send(req.body)
// // })

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

import express from 'express'
import {BadRequest} from './customExceptions'
import {Channel, Message, Server, User} from './dtos'
import {addMessage} from './services/channelService'
import { WebSocketServer } from 'ws';
import { WebSocket } from 'ws';
import * as UserService from './services/userService'
import * as MessageService from './services/messageService'

const router = express.Router();
const wss = new WebSocketServer({ port: 8080 });

const channels = new Map<number, WebSocket[]> ();
const users = new Set<any> ();

const addUserChannels = (sender: any, message: Message, ws: any) => 
{
    const serverChannels = sender.servers?.map((server: any) => server.channels.map((channel: Channel) => channel.id)).flat();
    const dms = sender.privateChannels?.map((channel: Channel) => channel.id);

    console.log(`serverChannels: ${serverChannels}`, `dms: ${dms}`);
    if (serverChannels)
    {
        for (const channel of serverChannels)
            channels.set(channel, channels.get(channel)?.concat(ws) || [ws]);
    }
    if (dms)
    {
        for (const channel of dms)
            channels.set(channel, channels.get(channel)?.concat(ws) || [ws]);
    }
}

wss.on('connection', (ws) => {
    console.log('new connection');
    ws.on('message', async (msg) => {
        try
        {
            // console.log(msg.toString());
            const message: Message = JSON.parse(msg.toString());
            console.log(message);
            const sender: User | null = await UserService.getUser(message.sender);
            if (!sender)
                throw new BadRequest(`Sender ${message.sender} doesn't exist`);
            if (!users.has(ws))
            {
                console.log('adding user channels');
                addUserChannels(sender, message, ws);
                users.add(ws);
            }
            if (!channels.get(message.channel))
                throw new BadRequest(`Channel ${message.channel} doesn't exist`);
            console.log('sending message');
            // channels.set(message.channel, channels.get(message.channel)?.filter((user: WebSocket) => user.readyState === user.OPEN));
            const channelWss = channels.get(message.channel);
            let wss;
            for (let i = 0; channelWss && i < channelWss.length; i++)
            {
                wss = channelWss[i];
                // if (wss != ws)
                // {
                    channelWss[i].send(JSON.stringify(message.content));
                    await MessageService.addMessage(message);
                // }
            }
        }
        catch (e)
        {
          if (e instanceof BadRequest)
            ws.send(JSON.stringify({error: e.message}));
          else
            ws.send(JSON.stringify({error: "Invalid Message"}));

          ws.close();
          users.delete(ws);
        }
    });
    ws.on('close', () => {
        console.log('connection closed');
        users.delete(ws);
    })
});