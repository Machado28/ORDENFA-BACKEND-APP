import { EntityRepository, Repository } from "typeorm"
import Period from "../app/models/Period"

@EntityRepository(Period)
class PeriodRepository extends Repository<Period> {}
export default PeriodRepository;