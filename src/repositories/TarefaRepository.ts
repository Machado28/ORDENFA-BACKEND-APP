import { EntityRepository, Repository } from 'typeorm';
import { Tarefa } from '../app/models/Tarefa';

@EntityRepository(Tarefa)
export class TarefaRepository extends Repository<Tarefa> {}
