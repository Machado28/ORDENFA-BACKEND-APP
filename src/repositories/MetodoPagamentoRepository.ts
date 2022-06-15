import 'reflect-metadata';
import { EntityRepository, Repository } from 'typeorm';
import { MetodoPagamento } from '../app/models/MetodoPagamento';

@EntityRepository(MetodoPagamento)
export class MetodoPagamentoRepository extends Repository<MetodoPagamento> {}
