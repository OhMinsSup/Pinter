import * as socketIO from 'socket.io';
import { Server } from 'http';

function initSocket(server: Server) {
    const io = socketIO(server, {
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
    });

    return io;
}

function socketMiddleware (io: SocketIO.Server): any {
    io.on('connection', (socket) => {
        console.log(`conneted websocket ${socket.id}`);
        socket.on(`disconnect`, () => {
            console.log(`disconneted websocket ${socket.id}`);
        });
    });
}

export {
    socketMiddleware,
    initSocket,
};