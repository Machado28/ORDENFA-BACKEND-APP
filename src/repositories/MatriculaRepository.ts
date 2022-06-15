import { EntityRepository, Repository } from 'typeorm';
import { Matricula } from '../app/models/Matricula';

@EntityRepository(Matricula)
export class MatriculaRepository extends Repository<Matricula> {}
