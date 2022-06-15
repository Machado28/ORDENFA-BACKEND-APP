import { EntityRepository, Repository } from 'typeorm';
import { CargoEscola } from '../app/models/CargoEscola';

@EntityRepository(CargoEscola)
export class CargoEscolaRepository extends Repository<CargoEscola> {}
