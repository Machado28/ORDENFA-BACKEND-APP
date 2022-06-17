import { EntityRepository, Repository } from 'typeorm';
import Curso from '../app/models/Curso';

@EntityRepository(Curso)
export class CursoRepository extends Repository<Curso> {}
