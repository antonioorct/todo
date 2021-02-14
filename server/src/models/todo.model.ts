import {v4 as uuid} from 'uuid';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_todo_userId: {
        name: 'fk_todo_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userId',
	onDelete: 'cascade',
      },
    },
  },
})
export class Todo extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    default: false,
  })
  completed: boolean;
  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt: Date;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
