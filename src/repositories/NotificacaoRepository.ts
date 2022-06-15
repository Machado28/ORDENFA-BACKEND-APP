import { EntityRepository, Repository } from 'typeorm';
import Notificacao from './../app/models/Notificacao';

@EntityRepository(Notificacao)
export class NotificacaoRepository extends Repository<Notificacao> {}
