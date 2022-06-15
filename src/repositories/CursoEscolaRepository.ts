import { EntityRepository, Repository } from "typeorm";
import CursoEscola from "../app/models/CursoEscola";

@EntityRepository(CursoEscola)
class CursoEscolaRepository extends Repository <CursoEscola>{}
export default CursoEscolaRepository;