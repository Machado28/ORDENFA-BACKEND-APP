import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Curso from './Curso';
import { TabelaDefault } from './shared';
import Usuario from './Usuario';

@Entity('inscricao')
class Inscricao{
  @PrimaryGeneratedColumn('uuid')
  id:string;
  
  @ManyToOne(()=>Curso, curso=>curso,{eager:true})
  @JoinColumn({name:"cursoId"})
  cursoId:Curso

  @ManyToOne(()=>Usuario, usuario=>usuario,{eager:true})
  @JoinColumn({name:"membroId"})
  membroId:Usuario

  @Column()
  estado:boolean
  
}
export default Inscricao;
