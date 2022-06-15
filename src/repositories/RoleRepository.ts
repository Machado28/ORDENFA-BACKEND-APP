import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../app/models/Role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
