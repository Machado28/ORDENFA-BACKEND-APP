import { EntityRepository, Repository } from 'typeorm';
import { TipoCampo } from './../app/models/TipoCampo';

@EntityRepository(TipoCampo)
export class TipoCampoRepository extends Repository<TipoCampo> {}
