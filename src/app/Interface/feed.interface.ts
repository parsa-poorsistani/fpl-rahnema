import { objId,substitution } from '../types/types';

export interface IFeed {
    managerId?:objId,
    points:number,
    substitutions?:Array<substitution>,
    likes:number,
    event?:objId
};