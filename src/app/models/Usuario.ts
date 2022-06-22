import 'reflect-metadata';
import { Entity} from 'typeorm';
import { UsuarioDefault } from './shared';
 

@Entity('usuario')
class Usuario extends UsuarioDefault {}
export default Usuario;
