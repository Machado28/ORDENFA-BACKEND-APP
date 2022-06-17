import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne} from 'typeorm';
import { TabelaDefault } from './shared';

@Entity('curso')
class Curso extends TabelaDefault {
}
export default Curso;
