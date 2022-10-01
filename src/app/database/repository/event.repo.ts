import models = require("../../models/path");
import { IEventRepo, IEvent } from "../../interface/event.interface";

export class EventRepo implements IEventRepo {
  public getCurrentEvent = async (): Promise<IEvent> => {
    let event: IEvent = await models.eventModel.findOne({ is_current: true });
    if (!event) throw "error in event repo";
    return event;
  };
}
