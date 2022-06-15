import { EntityRepository, Repository } from "typeorm"
import {Preco} from "../app/models/Preco"

@EntityRepository(Preco)
export class PrecoRepository extends Repository<Preco> {}

