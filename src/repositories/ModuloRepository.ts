import 'reflect-metadata';
import { EntityRepository, Repository } from 'typeorm';
import { Modulo } from '../app/models/Modulo';

@EntityRepository(Modulo)
export class ModuloRepository extends Repository<Modulo> {}
