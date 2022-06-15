import { EntityRepository, Repository } from 'typeorm';
import { TituloMenu } from './../app/models/TituloMenu';

@EntityRepository(TituloMenu)
export class TituloMenuRepository extends Repository<TituloMenu> {}
