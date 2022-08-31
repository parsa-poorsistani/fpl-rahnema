import express from 'express';
const routes = express.Router();
const { addPlayerToTeam, deletePlayerFromTeam, makeCaptain } = require('../controllers/teamController');

routes.route('/:id/add-player').patch(addPlayerToTeam);
routes.route('/:id/delete-player').patch(deletePlayerFromTeam);
routes.route('/:id/make-captain').patch(makeCaptain);

module.exports = routes;