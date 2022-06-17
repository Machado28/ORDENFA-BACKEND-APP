import { EntityRepository, Repository } from 'typeorm';
import TipoDeFicheiro from '../app/models/TipoFicheiro';

@EntityRepository(TipoDeFicheiro)
export class TipoDeFicheiroRepository extends Repository<TipoDeFicheiro> {}
