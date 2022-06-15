import { EntityRepository, Repository } from "typeorm";
import CursoSistema from "../app/models/CursoSistema";

@EntityRepository(CursoSistema)
class CursoSistemaRepository extends Repository <CursoSistema>{}
export default CursoSistemaRepository;