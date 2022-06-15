import { EntityRepository, Repository } from "typeorm";
import Month from "../app/models/Month";

@EntityRepository(Month)
class MonthRepository extends Repository<Month>{}
export default MonthRepository
