import { Request, Response } from "express";

interface ITeamController {
  addPlayerToTeam(req: Request, res: Response): Promise<Response>;
  deletePlayerFromTeam(req: Request, res: Response): Promise<Response>;
}

export = ITeamController;
