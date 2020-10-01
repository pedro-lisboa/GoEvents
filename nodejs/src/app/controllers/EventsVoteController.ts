import isUUID, { v4 } from 'is-uuid';
import { getRepository } from 'typeorm';

import Events from '../models/Events';
import AppError from '../../errors/AppError';

interface Request {
  event_id: string;
  vote: string;
}

class EventsVoteController {
  public async update({ event_id, vote }: Request): Promise<Events> {
    const eventsRepository = getRepository(Events);

    if (!isUUID.v4(event_id)) {
      throw new AppError('O evento não existe.');
    }

    const event = await eventsRepository.findOne(event_id);

    if (!event) {
      throw new AppError('O evento não existe.');
    }

    if (vote === 'like') {
      event.like += 1;
    } else if (vote === 'dislike') {
      event.dislike += 1;
    }

    await eventsRepository.save(event);

    return event;
  }
}

export default EventsVoteController;
