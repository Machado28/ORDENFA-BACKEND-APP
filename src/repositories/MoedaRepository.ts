import 'reflect-metadata';
import { EntityRepository, Repository } from 'typeorm';
import { Moeda } from '../app/models/Moeda';

@EntityRepository(Moeda)
export class MoedaRepository extends Repository<Moeda> {}
