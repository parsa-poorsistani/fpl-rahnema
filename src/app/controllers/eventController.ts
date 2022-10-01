import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { ApiGeneralService } from "../service/api.general.service";
import {
  IEvent,
  IEventController,
  IEventService,
} from "../interface/event.interface";
import errors = require("../helpers/error/internalServerError");

export class EventController
  extends ApiGeneralService
  implements IEventController
{
  eventService: IEventService;
  constructor() {
    super();
    this.eventService = new EventService();
  }

  public getCurrentEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const event: IEvent = await this.eventService.getCurrentEvent();
      return await this.generalSuccessfulResponse(
        res,
        "Event sent successfuly",
        event
      );
    } catch (err: any) {
      return await this.sendFailedResponse(
        res,
        new errors.InternalServerError("error in getting event")
      );
    }
  };
}
