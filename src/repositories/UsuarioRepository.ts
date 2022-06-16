import { EntityRepository, Repository } from 'typeorm';
import Usuario from '../app/models/Usuario';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {}
