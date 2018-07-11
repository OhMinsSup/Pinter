import { UserSubState } from '../../store/modules/auth';

export type SendAuthEmailPayload = {
    payload: string,
    data: {
        isUser: boolean
    },
    error: any
}

export type CodePayload = {
    payload: string,
    data: {
        email: string,
        registerToken: string
    },
    error: any
}

export type LocalRegisterPayload = {
    payload: {
        registerToken: string, 
        username: string, 
        displayName: string
    },
    data: {
        user: UserSubState
        token: string
    },
    error: any
}

