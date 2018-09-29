import * as socketIO from 'socket.io';
import * as http from 'http';

class Socket {
    public io: SocketIO.Server | null = null;
    public socket: SocketIO.Socket | null = null;
    public server: http.Server | null = null;

    public set setServer(server: http.Server) {
        this.server = server;
    }

    public get getSocket() {
        if (!this.socket) return;
        return this.socket;
    }

    public get conencted() {
        if (!this.io) return false;
        return this.io;
    }

    public connect() {
        const p = new Promise(
            (resolve, reject) => {
                const io = socketIO(this.server, {
                    serveClient: false,
                    pingInterval: 10000,
                    pingTimeout: 5000,
                    cookie: false,
                });
        
                io.on('connection', (socket: SocketIO.Socket) => {
                    console.log(`conneted websocket ${socket.id}`);
                    this.socket = socket; 
                    socket.emit('connection');
                    resolve();

                    socket.on(`disconnect`, () => {
                        console.log(`disconneted websocket ${socket.id}`);
                    });
                });

                io.on('Connect_failed', (err) => {
                    reject(err);
                });

                this.io = io;
            },
        );
        return p;
    }
}

const socketServer = new Socket();

export default socketServer;
