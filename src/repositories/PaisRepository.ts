import { EntityRepository, Repository } from 'typeorm';
import { Pais } from '../app/models/Pais';

@EntityRepository(Pais)
export class PaisRepository extends Repository<Pais> {}
