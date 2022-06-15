import { EntityRepository, Repository } from "typeorm"
import{ DisciplinaClasseCurso} from "../app/models/DisciplinaClasseCurso"

@EntityRepository(DisciplinaClasseCurso)
export class DisciplinaClasseCursoRepository extends Repository<DisciplinaClasseCurso> {}

