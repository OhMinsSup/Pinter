import * as http from "http";
// import * as cluster from 'cluster';
// import { cpus } from 'os';
import * as config from "./config/config";
import Server from "./server";
import socketServer from './lib/socket';
/*
if (cluster.isMaster) {
    const CPUS = cpus().length;

    for(let i = 0; i < CPUS; i++) {
        cluster.fork();
    }

    console.log('Clustering: I will start ' + CPUS + ' workers...')
    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online now!');
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        console.log('Starting a new worker')
        cluster.fork()
    })
} else {
  */
    const port = normalizePort(config.PORT || 5000);
    Server.set("port", port);
    
    const server = http.createServer(Server);
    server.listen(port, () => {
        console.log(`Server listening on port ${port} ✅`);
    });
    server.on("error", onError);
    onSocket(server);
    
    function normalizePort(val: number | string): number | string | boolean {
        const port: number = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }
    
    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== "listen") { throw error; }
        const bind = (typeof port === "string") ? "Pipe" + port : "Port" + port;
        switch (error.code) {
          case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
          case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
    }
    
    function onSocket(server: http.Server): any {
        let io: any;
        socketServer.setServer = server;
    
        if (!socketServer.conencted) {
            io = socketServer.connect();
        } else {
            io = null;
            console.log('socket connection...');
        }
        return io;
    }
// }
