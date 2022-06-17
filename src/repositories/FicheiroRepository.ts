import { EntityRepository, Repository } from 'typeorm';
import Ficheiro from '../app/models/Ficheiro';

@EntityRepository(Ficheiro)
export class FicheiroRepository extends Repository<Ficheiro> {}
