import * as SocketIOClient from 'socket.io-client';
import produce from 'immer';
import { handleActions } from 'redux-actions';

const SOCKETS_CONNECTION_PENDING = 'socket/SOCKETS_CONNECTION_PENDING';
const SOCKETS_CONNECTION_SUCCESS = 'socket/SOCKETS_CONNECTION_SUCCESS';

let socket = null;

export const socketCreators = {
    socketsConnect: () => (dispatch: any) => {
        dispatch({
            type: SOCKETS_CONNECTION_PENDING,
        });

        socket = SocketIOClient('ws://localhost:5000/');
          
        socket.on('connection', () => {            
            dispatch({
                type: SOCKETS_CONNECTION_SUCCESS,
            });
        });
    }
}


export interface SocketState {
    isConnected: boolean;
}

const initialState: SocketState = {
    isConnected: false,
}

export default handleActions<SocketState, any>({
    [SOCKETS_CONNECTION_SUCCESS]: (state) => {
        return produce(state, (draft) => {
            draft.isConnected = true;
        })
    },
}, initialState);