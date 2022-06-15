import { EntityRepository, Repository } from "typeorm"
import {TipoPagamento} from "../app/models/TipoPagamento"

@EntityRepository(TipoPagamento)
export class TipoPagamentoRepository extends Repository<TipoPagamento> {}

