import models = require("../../app/models/path");
import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { ApiGeneralService } from "../service/api.general.service";
import { IEventController } from "../Interface/event.interface";

export class EventController
  extends ApiGeneralService
  implements IEventController
{
  eventService;
  constructor() {
    super();
    this.eventService = new EventService();
  }

  public getCurrentEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let event = await this.eventService.getCurrentEvent();
    return await this.generalSuccessfulResponse(
      res,
      "Event sent successfult",
      event
    );
  };
}
