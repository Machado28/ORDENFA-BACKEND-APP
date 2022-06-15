import { EntityRepository, Repository } from "typeorm"
import{ Disciplina} from "../app/models/Disciplina"

@EntityRepository(Disciplina)
 export class DisciplinaRepository extends Repository<Disciplina> {}

