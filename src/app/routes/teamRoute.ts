import express from 'express';
const routes = express.Router();
const { addPlayerToTeam, deletePlayerFromTeam } = require('../controllers/teamController');

routes.route('/:id/add-player').post(addPlayerToTeam);
routes.route('/:id/delete-player').patch(deletePlayerFromTeam);

module.exports = routes;