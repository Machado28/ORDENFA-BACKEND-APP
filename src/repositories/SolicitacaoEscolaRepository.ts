import { EntityRepository, Repository } from 'typeorm';
import SolicitacaoEscola from '../app/models/SolicitacaoEscola';

@EntityRepository(SolicitacaoEscola)
export class SolicitacaoEscolaRepository extends Repository<SolicitacaoEscola> {}
