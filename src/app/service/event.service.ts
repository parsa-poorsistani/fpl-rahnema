import { EventRepo } from "../database/repository/event.repo";
import { IEventService, IEvent } from "../interface/event.interface";

export class EventService implements IEventService {
  eventRepo;

  constructor() {
    this.eventRepo = new EventRepo();
  }

  public getCurrentEvent = async (): Promise<IEvent> => {
    const currentEvent: IEvent = await this.eventRepo.getCurrentEvent();
    return currentEvent;
  };
}
