import 'reflect-metadata';
import { Column, Entity,PrimaryGeneratedColumn} from 'typeorm';
import { DataDefault } from './shared';

@Entity('escola')
class Escola extends DataDefault {
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  nome:string

  @Column()
  tipo:string
}
export default Escola;
