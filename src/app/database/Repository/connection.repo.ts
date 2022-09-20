import models = require('../../models/path');
import { IConnectionRepo,IConnection } from '../../Interface/connection.interface';
import { objId } from '../../types/types';

export class ConnectionRepo implements IConnectionRepo {
    async connect(following: objId, follower: objId): Promise<void> {
        const connection:IConnection = {
            following:following,
            follower:follower
        };
        await models.connectionModel.create(connection);
    };

    async disconnect(following: objId,follower:objId): Promise<void> {
        await models.connectionModel.deleteOne({following:following,follower:follower},(error:Error)=>{
            console.log(error);
            
        });
        throw new Error('Method not implemented.');
    };

    // async findFollowings(managerId: objId): Promise<objId[]> {
    //     throw new Error('Method not implemented.');
    // };

    // async findFollowers(managerId: objId): Promise<objId[]> {
    //     throw new Error('Method not implemented.');
    // };

    async isFollowing(managerId: objId,target:objId): Promise<boolean> {
        const relation = await models.connectionModel.findOne({following:target,follower:managerId});
        if(!relation) {
            return false;
        }
        return true;
    };

};