import { EntityRepository, Repository } from 'typeorm';
import School from '../app/models/School';

@EntityRepository(School)
export class SchoolRepository extends Repository<School> {}
