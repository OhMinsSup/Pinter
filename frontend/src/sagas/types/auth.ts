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

export type SocialRegisterRequestPayload = {
    payload: {
        provider: string, 
        accessToken :string, 
        displayName: string, 
        username: string, 
        socialEmail: string
    },
    data: {
        user: UserSubState,
        token: string
    },
    error: any
}

export type LocalLoginPayload = {
    payload: {
        code: string,
        history: any
    },
    data: {
        user: UserSubState,
        token: string
    },
    error: any
}

export type ProviderPayload = {
    payload: {
        provider: string,
        history: any
    }
    data: {
        accessToken?: string,
        provider?: string
    },
    error: any
}

export type VerifySocialPayload = {
    payload: any,
    data: {
        profile: {
            id: string
            thumbnail: string
            email: string
            username: string
        },
        exists: boolean
    },
    error: any
}

export type SocialLoginPayload = {
    payload: any,
    data: {
        user: UserSubState,
        token: string    
    }
    error: any
}
