import { EntityRepository, Repository } from 'typeorm';
import { Funcionario } from '../app/models/Funcionario';

@EntityRepository(Funcionario)
export class FuncionarioRepository extends Repository<Funcionario> {}
