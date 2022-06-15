import { EntityRepository, Repository } from "typeorm";
import SystemClasse from "../app/models/SystemClass";

@EntityRepository(SystemClasse)
class SystemClassRepository extends Repository<SystemClasse> {}
export default SystemClassRepository;
