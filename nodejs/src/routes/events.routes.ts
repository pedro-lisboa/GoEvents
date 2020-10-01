import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Events from '../app/models/Events';
import EventsController from '../app/controllers/EventsController';
import EventsVoteController from '../app/controllers/EventsVoteController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const eventsRouter = Router();
const upload = multer(uploadConfig);

eventsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('photo'),
  async (request, response) => {
    const userLoggedId = request.user.id;
    const { name, location, comment } = request.body;
    const { filename } = request.file;
    const eventsController = new EventsController();

    // console.log(request.body);
    // console.log(request.file);

    const event = await eventsController.store({
      user_owner_id: userLoggedId,
      name,
      location,
      photo: filename,
      comment,
      like: 0,
      dislike: 0,
    });

    return response.json(event);
  },
);

eventsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const eventsRepository = getRepository(Events);
  const event = await eventsRepository.find({ order: { created_at: 'DESC' } });

  // console.log(request.event);
  return response.json(event);
});

eventsRouter.put('/vote', ensureAuthenticated, async (request, response) => {
  const { event_id, vote } = request.body;
  const eventsVoteController = new EventsVoteController();

  const event = await eventsVoteController.update({
    event_id,
    vote,
  });

  return response.json(event);
});

eventsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;

  const eventsController = new EventsController();

  const eventRemoved = await eventsController.remove({
    event_id: id,
    user_id,
  });
  console.log(eventRemoved);
  return response.json(eventRemoved);
});

export default eventsRouter;
