import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { BiDislike, BiLike } from 'react-icons/bi';

import { Container } from './styles';

interface EventProps {
  EventDate: string;
  Name: string;
  Description: string;
}

const EventSearch: React.FC<EventProps> = ({ EventDate, Name, Description, children }) => {
  return (
    <Container>
    <span>{EventDate}</span>
    <span>{Name}</span>
    <span>{Description}</span>
      {children}
    <BiLike/>
    <BiDislike/>
    <FiTrash2/>
    </Container>
  );
};

export default EventSearch;
