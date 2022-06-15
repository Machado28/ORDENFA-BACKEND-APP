import { EntityRepository, Repository } from "typeorm";
import course from "../app/models/Course";

@EntityRepository(course)
class courseRepository extends Repository<course>{

}
export default courseRepository;