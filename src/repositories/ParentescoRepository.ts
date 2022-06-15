import { EntityRepository, Repository } from 'typeorm';
import { Parentesco } from '../app/models/Parentesco';

@EntityRepository(Parentesco)
export class ParentescoRepository extends Repository<Parentesco> {}
