import { EntityRepository, Repository } from 'typeorm';
import { Campo } from './../app/models/Campo';

@EntityRepository(Campo)
export class CampoRepository extends Repository<Campo> {}
