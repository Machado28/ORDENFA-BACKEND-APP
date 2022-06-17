import { EntityRepository, Repository } from 'typeorm';
import Inscricao from '../app/models/Inscricao';

@EntityRepository(Inscricao)
export class InscricaoRepository extends Repository<Inscricao> {}
