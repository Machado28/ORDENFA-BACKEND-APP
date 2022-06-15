import { EntityRepository, Repository } from 'typeorm';
import { Action } from './../app/models/Action';

@EntityRepository(Action)
export class ActionRepository extends Repository<Action> {}
