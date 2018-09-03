import * as socketIO from 'socket.io';
import { Server } from 'http';
import User from '../database/models/User';
import Notice from '../database/models/Notice';

type UserPayload = {
    to: string,
    from: string,
};

function initSocket(server: Server) {
    const io = socketIO(server, {
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
    });

    io.on('connection', (socket) => {
        console.log('conneted websocket ✅');
        socket.on('remove-notice', async (id: string) => {
            // id값은 메세지를 받은 유저를 의미한다.
            console.log(id);
        });

        socket.on('write-pin', async (payload: UserPayload) => {
            const { to, from } = payload;

            try {
                const [toUser, fromUser] = await Promise.all([
                    User.findById(to),
                    User.findById(from),
                ]);  

                if (!toUser || !fromUser) {
                    return new Error('유저가 존재하지 않습니다.');
                }

                const message = await Notice.create({
                    to,
                    from,
                    message: `${fromUser.profile.displayName}님 ${toUser.profile.displayName}님이 새로운 핀을 작성 하였습니다.`,
                });
                // TODO io.to.emit으로 추후 수정할 것
                return io.emit('new-message', {
                    message: message.message,
                });
            } catch (e) {
                throw e;
            }
        });

        socket.on('follow', async (payload: UserPayload) => {
            const { to, from } = payload;

            try {
                console.log(to, from);
            } catch (e) {
                throw e;
            }
        });

        socket.on('unfollow', async (payload: UserPayload) => {
            const { to, from } = payload;

            try {
                console.log(to, from);
            } catch (e) {
                throw e;
            }
        });

        socket.on('pin-like', async (payload: UserPayload) => {
            const { to, from } = payload;

            try {
                console.log(to, from);
            } catch (e) {
                throw e;
            }   
        });

        socket.on('pin-comment', async (payload: UserPayload) => {
            const { to, from } = payload;

            try {
                console.log(to, from);
            } catch (e) {
                throw e;
            }   
        });
    });
}

export {
    initSocket,
};