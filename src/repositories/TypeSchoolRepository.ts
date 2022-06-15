import { EntityRepository, Repository } from 'typeorm';
import TypeSchool from '../app/models/TypeSchool';

@EntityRepository(TypeSchool)
export class TypeSchoolRepository extends Repository<TypeSchool> {}

