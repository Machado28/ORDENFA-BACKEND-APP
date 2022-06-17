import 'reflect-metadata';
import { Entity} from 'typeorm';
import { TabelaDefault } from './shared';
 

@Entity('tipoDeFicheiro')
class TipoDeFicheiro extends TabelaDefault {}
export default TipoDeFicheiro;
