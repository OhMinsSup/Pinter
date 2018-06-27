import { IPin } from '../models/Pin';
import { IAuth } from '../models/Auth';

function serializePin (pin: IPin) {
    const {
        _id: pinId,
        filename,
        filepath,
        title,
        description,
        user: {
            profile: {
                thumbnail,
                displayName
            },
            _id: userId
        }
    } = pin

    return {
        pinId,
        filename,
        filepath,
        title,
        description,
        thumbnail,
        displayName,
        userId
    };
}

export {
    serializePin
};