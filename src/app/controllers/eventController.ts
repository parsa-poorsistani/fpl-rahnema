import models = require("../../app/models/path");
import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { IEventController } from "../Interface/event.interface";

export class EventController implements IEventController {
  eventService;
  constructor() {
    this.eventService = new EventService();
  }

  public getCurrentEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let event = await this.eventService.getCurrentEvent();
    return res.status(200).json({ data: event });
  };
}
