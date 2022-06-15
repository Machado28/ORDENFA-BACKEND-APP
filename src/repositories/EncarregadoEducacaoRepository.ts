import { EntityRepository, Repository } from 'typeorm';
import { EncarregadoEducacao } from '../app/models/EncarregadoEducacao';

@EntityRepository(EncarregadoEducacao)
export class EncarregadoEducacaoRepository extends Repository<EncarregadoEducacao> {}
