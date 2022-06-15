import { EntityRepository, Repository } from "typeorm"
import AcademicYear from "../app/models/AcademicYear"

@EntityRepository(AcademicYear)
class AcademicYearRepository extends Repository<AcademicYear> {}
export default AcademicYearRepository;
