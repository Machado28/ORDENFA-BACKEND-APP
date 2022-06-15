import { EntityRepository, Repository } from "typeorm";
import TypeFile from "../app/models/TypeFile";

@EntityRepository(TypeFile)
class TypeFileRepository extends Repository<TypeFile>{}
export default TypeFileRepository;