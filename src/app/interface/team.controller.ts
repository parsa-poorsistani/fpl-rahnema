import { Request, Response } from "express";

export interface ITeamController {
  addPlayerToTeam(req: Request, res: Response): Promise<Response>;
  deletePlayerFromTeam(req: Request, res: Response): Promise<Response>;
}
