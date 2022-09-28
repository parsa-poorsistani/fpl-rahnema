import { IConnectionService } from "../interface/connection.interface";
import { objId } from "../types/types";
import { IManager } from "../interface/manager.interface";
import { connectionResponse } from "../types/types";
import { ConnectionRepo } from "../database/repository/connection.repo";
import { ManagerRepo } from "../database/repository/manager.repo";
const connectionRepo = new ConnectionRepo();
const managerRepo = new ManagerRepo();

export class ConnectionService implements IConnectionService {
  async follow(managerId: objId, following: objId): Promise<void> {
    try {
      await connectionRepo.connect(following, managerId);
    } catch (error) {
      console.log(error);
    }
  }

  async unfollow(managerId: objId, following: objId): Promise<void> {
    try {
      await connectionRepo.disconnect(following, managerId);
    } catch (error) {
      console.log(error);
    }
  }

  async displayFollowings(
    managerId: objId
  ): Promise<connectionResponse[] | null> {
    let result: connectionResponse[] = [];
    const managers: IManager[] = await managerRepo.getManagers();
    if (!managers) {
      return null;
    }
    for (let manager of managers) {
      let isFollowing: boolean = await connectionRepo.isFollowing(
        managerId,
        manager._id
      );
      if (managerId === manager._id || !isFollowing) {
        continue;
      }
      let data: connectionResponse = {
        managerId: manager._id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        img: null,
        following: isFollowing,
      };
      result.push(data);
    }
    return result;
  }

  async displayFollowers(
    managerId: objId
  ): Promise<connectionResponse[] | null> {
    let result: connectionResponse[] = [];
    const managers: IManager[] = await managerRepo.getManagers();
    if (!managers) {
      return null;
    }
    for (let manager of managers) {
      let isFollowing: boolean = await connectionRepo.isFollowing(
        manager._id,
        managerId
      );
      if (managerId === manager._id || !isFollowing) {
        continue;
      }
      let data: connectionResponse = {
        managerId: manager._id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        img: null,
        following: isFollowing,
      };
      result.push(data);
    }
    return result;
  }

  async search(
    managerId: objId,
    name: string
  ): Promise<connectionResponse[] | null> {
    let result: connectionResponse[] = [];
    const managers: IManager[] | null = await managerRepo.getManagersByName(
      name
    );
    if (!managers) {
      return null;
    }
    for (let manager of managers) {
      let isFollowing: boolean = await connectionRepo.isFollowing(
        managerId,
        manager._id
      );
      let data: connectionResponse = {
        managerId: manager._id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        img: null,
        following: isFollowing,
      };
      result.push(data);
    }
    return result;
  }

  async searchInFollowers(
    managerId: objId,
    name: string
  ): Promise<connectionResponse[] | null> {
    let result: connectionResponse[] = [];
    const managers: IManager[] | null = await managerRepo.getManagersByName(
      name
    );
    if (!managers) {
      return null;
    }
    for (let manager of managers) {
      let isFollowing: boolean = await connectionRepo.isFollowing(
        manager._id,
        managerId
      );
      if (managerId === manager._id || !isFollowing) {
        continue;
      }
      let data: connectionResponse = {
        managerId: manager._id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        img: null,
        following: isFollowing,
      };
      result.push(data);
    }
    return result;
  }

  async searchInFollowings(
    managerId: objId,
    name: string
  ): Promise<connectionResponse[] | null> {
    let result: connectionResponse[] = [];
    const managers: IManager[] | null = await managerRepo.getManagersByName(
      name
    );
    if (!managers) {
      return null;
    }
    for (let manager of managers) {
      let isFollowing: boolean = await connectionRepo.isFollowing(
        managerId,
        manager._id
      );
      if (managerId === manager._id || !isFollowing) {
        continue;
      }
      let data: connectionResponse = {
        managerId: manager._id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        img: null,
        following: isFollowing,
      };
      result.push(data);
    }
    return result;
  }
}
