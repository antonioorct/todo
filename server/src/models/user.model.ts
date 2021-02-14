import {v4 as uuid} from 'uuid';
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email: string;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
