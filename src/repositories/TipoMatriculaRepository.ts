import { EntityRepository, Repository } from 'typeorm';
import { TipoMatricula } from '../app/models/TipoMatricula';

@EntityRepository(TipoMatricula)
export class TipoMatriculaRepository extends Repository<TipoMatricula> {}
