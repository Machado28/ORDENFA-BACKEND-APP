import 'reflect-metadata';
import { Entity} from 'typeorm';
import { TabelaDefault } from './shared';
 

@Entity('tipoDecontacto')
class TipoDeContacto extends TabelaDefault {}
export default TipoDeContacto;
