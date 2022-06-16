import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne} from 'typeorm';
import { TabelaDefault } from './shared';
import TipoDeContacto from './TipoDeContacto';
 

@Entity('contacto')
class Contacto extends TabelaDefault {
  @ManyToOne(()=>TipoDeContacto,tipo=>tipo,{eager:true,nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
  @JoinColumn({name:"tipo"})
  tipo:TipoDeContacto
}
export default Contacto;
