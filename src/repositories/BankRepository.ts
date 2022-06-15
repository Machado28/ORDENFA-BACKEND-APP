import { EntityRepository, Repository } from "typeorm";
import Bank from "../app/models/Bank";

@EntityRepository(Bank)
class BankRepository extends Repository<Bank>{

}
export default BankRepository