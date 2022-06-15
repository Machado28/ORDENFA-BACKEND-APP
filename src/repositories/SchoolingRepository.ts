import { EntityRepository, Repository } from "typeorm";
import Schooling from "../app/models/Schooling";

@EntityRepository(Schooling)
class SchoolingRepository extends Repository <Schooling>{}
export default SchoolingRepository;