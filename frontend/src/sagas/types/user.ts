import { UserSubState } from '../../store/modules/user';

export type CheckUserTypes = {
    data: {
        user: UserSubState
    },
    error: any
}