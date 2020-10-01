import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Users from './Users';

@Entity('events')
class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_owner_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_owner_id' })
  user_owner: Users;

  @Column()
  location: string;

  @Column()
  photo: string;

  @Column()
  comment: string;

  @Column()
  like: number;

  @Column()
  dislike: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Events;
