import { UserSubState,  } from '../../store/modules/auth';
import { History } from 'history';

export type SendAuthEmailTypes = {
    payload: {
        email: string
    },
    data: {
        isUser: boolean
    }
}

export type CodeTypes = {
    payload: {
        code: string
    },
    data: {
        email: string,
        registerToken: string
    }
}

export type LocalRegisterTypes = {
    payload: {
        registerToken: string, 
        username: string, 
        displayName: string
    },
    data: {
        auth: UserSubState
        token: string
    }
}

export type LocalLoginTypes = {
    payload: {
        code: string
    },
    data: {
        auth: UserSubState,
        token: string
    }
}

type verifySocialData = {
    data: {
        profile: {
            id: string
            thumbnail: string
            email: string
            username: string
        },
        exists: boolean
    },
}

type SocialLoginData = {
    data: {
        auth: UserSubState,
        token: string    
    }
}

export type SocialLoginTypes = {
    payload: {
        provider: string,
        history: History
    }
    data: verifySocialData & SocialLoginData
}

export type SocialRegisterTypes = {
    payload: {
        accessToken: string, 
        provider: string, 
        username: string, 
        displayName: string
    },
    data: {
        auth: UserSubState,
        token: string
    }
}