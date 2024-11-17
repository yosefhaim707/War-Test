import { Server, Socket } from 'socket.io';
import express from 'express';
import http from 'http';
import { IAttack } from '../models/Attack';
import launchController from '../controllers/launchController';
import launchService from '../services/attackService/launchService';
import Organization, { IOrganization } from '../models/Organization';
import interceptService from '../services/attackService/interceptService';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT'],
    },
});

io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('login', async (organization: IOrganization) => {
        socket.join(organization.name);
    });

    socket.on('logout', (organization: IOrganization) => {
        socket.leave(organization.name);
    });

    socket.on('launchAttack', async (attack: IAttack) => {
        try {
            if (!attack || !attack.missile || !attack.target || !attack.source) {
                throw new Error('Missing required fields');
            }
            const newAttack: IAttack = await launchService(attack);
            const targetName: string | null = newAttack.target instanceof Organization ? newAttack.target.name : null;
            const sourceName: string | null = newAttack.source instanceof Organization ? newAttack.source.name : null;
            if (targetName === null || sourceName === null) {
                throw new Error('Target or source not found');
            }

            io.to([targetName, sourceName]).emit('newAttack', newAttack);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Internal server error');
        }
    });

    socket.on('updateAttack', async (attack: IAttack) => {
        try {
            const updatedAttack: IAttack = await interceptService(attack);
            const targetName: string | null = updatedAttack.target instanceof Organization ? updatedAttack.target.name : null;
            const sourceName: string | null = updatedAttack.source instanceof Organization ? updatedAttack.source.name : null;
            if (targetName === null || sourceName === null) {
                throw new Error('Target or source not found');
            }
            io.to([targetName, sourceName]).emit('updatedAttack', updatedAttack);
        } catch (error) {
            
        }
    });
});




server.listen(3000, () => {
    console.log('Server is running on port 7660');
});


