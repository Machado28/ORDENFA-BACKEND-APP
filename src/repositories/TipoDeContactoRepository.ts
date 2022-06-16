import { EntityRepository, Repository } from 'typeorm';
import TipoDeContacto from '../app/models/TipoDeContacto';

@EntityRepository(TipoDeContacto)
export class TipoDeContactoRepository extends Repository<TipoDeContacto> {}
