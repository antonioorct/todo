import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_todo_userId: {
        name: 'fk_todo_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userId',
      },
    },
  },
})
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt: Date;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
