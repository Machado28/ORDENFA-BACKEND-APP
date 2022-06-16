import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne} from 'typeorm';
import { TabelaDefault } from './shared';
import TipoDeContacto from './TipoDeContacto';
import Usuario from './Usuario';
 

@Entity('contacto')
class Contacto extends TabelaDefault {
  @ManyToOne(()=>TipoDeContacto,tipo=>tipo,{eager:true,nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
  @JoinColumn({name:"tipo"})
  tipo:TipoDeContacto

  @ManyToOne(()=>Usuario,usuario=>usuario,{eager:true,nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  @JoinColumn({name:"usuarioId"})
  usuarioId:Usuario
}
export default Contacto;
