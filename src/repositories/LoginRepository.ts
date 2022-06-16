import { EntityRepository, Repository } from 'typeorm';
import Login from '../app/models/Login';

@EntityRepository(Login)
export  default class LoginRepository extends Repository<Login> {}
