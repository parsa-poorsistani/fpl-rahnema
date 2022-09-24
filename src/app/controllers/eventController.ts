import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { ApiGeneralService } from "../service/api.general.service";
import { IEventController, IEventService } from "../Interface/event.interface";
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
    const event = await this.eventService.getCurrentEvent();
    if (event) {
      return await this.generalSuccessfulResponse(
        res,
        "Event sent successfult",
        event
      );
    }
    return await this.sendFailedResponse(
      res,
      new errors.InternalServerError("error while getting current event")
    );
  };
}
