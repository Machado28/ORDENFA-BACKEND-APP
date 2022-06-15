import { EntityRepository, Repository } from 'typeorm';
import { Cargo } from '../app/models/Cargo';

@EntityRepository(Cargo)
export class CargoRepository extends Repository<Cargo> {}
