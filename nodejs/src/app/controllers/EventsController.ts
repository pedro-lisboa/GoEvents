import isUUID, { v4 } from 'is-uuid';
import { getRepository } from 'typeorm';

import Events from '../models/Events';
import AppError from '../../errors/AppError';

interface Request {
  user_owner_id: string;
  name: string;
  location: string;
  photo: string;
  comment: string;
  like: number;
  dislike: number;
}

interface RemoveRequest {
  event_id: string;
  user_id: string;
}

class EventsController {
  public async store({
    user_owner_id,
    name,
    location,
    photo,
    comment,
    like,
    dislike,
  }: Request): Promise<Events> {
    const eventsRepository = getRepository(Events);

    const event = eventsRepository.create({
      user_owner_id,
      name,
      location,
      photo,
      comment,
      like,
      dislike,
    });

    await eventsRepository.save(event);

    return event;
  }

  public async remove({ event_id, user_id }: RemoveRequest): Promise<Events> {
    const eventsRepository = getRepository(Events);

    if (!isUUID.v4(event_id)) {
      throw new AppError('O evento não existe.');
    }

    const event = await eventsRepository.findOne(event_id);

    if (!event) {
      throw new AppError('O evento não existe.');
    }

    if (event.user_owner_id !== user_id) {
      throw new AppError('Apenas o usuário criador do evento pode removê-lo.');
    }

    await eventsRepository.delete(event_id);
    return event;
  }
}

export default EventsController;
