import { Request, Response } from 'express';
import GroupPin, { IGroupPin } from '../../../database/models/GroupPin';
import Group from '../../../database/models/Group';

export const groupCreatePin = async (req: Request, res: Response): Promise<any> => {
    const groupId: string = req['group']._id;
    const pinId: string = req['pin']._id;

    try {
        const exists: IGroupPin = await GroupPin.checkExists(pinId, groupId);

        if (exists) {
            return res.status(409).json({
                name: '이미 등록한 핀입니다',
            });
        }

        await GroupPin.create({ pinId, groupId });
        await Group.pinCounts(groupId);

        res.json({
            group: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const groupDeletePin = async (req: Request, res: Response): Promise<any> => {
    const groupId: string = req['group']._id;
    const pinId: string = req['pin']._id;

    try {
        const exists: IGroupPin = await GroupPin.checkExists(pinId, groupId);

        if (!exists) {
            return res.status(409).json({
                name: '등록하지 않는 핀입니다',
            });
        }

        await GroupPin.deleteOne({ 
            $and: [ 
                { 
                    pinId: pinId, 
                    groupId: groupId 
                }
            ] 
        });
        await Group.unPinCounts(groupId);

        res.json({
            group: false,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}