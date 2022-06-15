import { EntityRepository, Repository } from 'typeorm';
import TypeContact from '../app/models/TypeContact';

@EntityRepository(TypeContact)
class TypeContactRepository extends Repository<TypeContact> {}
export default TypeContactRepository;
