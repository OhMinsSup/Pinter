import * as socketIO from 'socket.io';
import { Server } from 'http';

type UserPayload = {
    to: string,
    from: string,
};
let count: number = 0;

function initSocket(server: Server) {
    const io = socketIO(server, {
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
    });

    io.on('connection', (socket) => {
        count++;
        console.log(`conneted websocket  ${socket.id} 현재 접속자수: ${count}`);
        socket.on(`disconnect`, () => {
            count--;
            console.log(`disconneted websocket ${socket.id}`);
        });
    });
}

export {
    initSocket,
};