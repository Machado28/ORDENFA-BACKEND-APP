import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { TabelaDefault } from './shared';
import TipoDeFicheiro from './TipoFicheiro';
import Usuario from './Usuario';
 

@Entity('ficheiro')
class Ficheiro extends TabelaDefault {
  @ManyToOne(()=>TipoDeFicheiro,tipo=>tipo,{eager:true,nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
  @JoinColumn({name:"tipo"})
  tipo:TipoDeFicheiro

  @Column()
  path:string

  @Column()
  url:string

  @Column()
  nome:string


}
export default Ficheiro;
