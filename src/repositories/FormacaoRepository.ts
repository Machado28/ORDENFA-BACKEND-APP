import { EntityRepository, Repository } from 'typeorm';
import { Formacao } from '../app/models/Formacao';

@EntityRepository(Formacao)
export class FormacaoRepository extends Repository<Formacao> {}
