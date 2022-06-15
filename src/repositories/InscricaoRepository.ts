import { EntityRepository, Repository } from 'typeorm';
import {Inscricao} from '../app/models/inscricao';

@EntityRepository(Inscricao)
export class InscricaoRepository extends Repository<Inscricao> {}
