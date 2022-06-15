import { EntityRepository, Repository } from "typeorm"
import Pagamento from "../app/models/Pagamento"

@EntityRepository(Pagamento)
export class PagamentoRepository extends Repository<Pagamento> {}

