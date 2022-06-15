import { EntityRepository, Repository } from 'typeorm';
import { EscolaCampoMatricula } from './../app/models/EscolaCampoMatricula';

@EntityRepository(EscolaCampoMatricula)
export class EscolaCampoMatriculaRepository extends Repository<EscolaCampoMatricula> {}
