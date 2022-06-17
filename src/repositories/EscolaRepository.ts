import { EntityRepository, Repository } from 'typeorm';
import Escola from '../app/models/Escola';

@EntityRepository(Escola)
export class EscolaRepository extends Repository<Escola> {}
