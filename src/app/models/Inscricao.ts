import 'reflect-metadata';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Curso from './Curso';
import Escola from './Escola';
import Ficheiro from './Ficheiro';
import { TabelaDefault } from './shared';
import Usuario from './Usuario';

@Entity('inscricao')
class Inscricao {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => Curso, curso => curso, { eager: true })
   @JoinColumn({ name: 'cursoId' })
   cursoId: Curso;

   @ManyToOne(() => Usuario, usuario => usuario, { eager: true })
   @JoinColumn({ name: 'membroId' })
   membroId: Usuario;

   @ManyToMany(() => Escola, escola => escola, { eager: true })
   @JoinTable({ inverseJoinColumn: { name: 'inscricao' }, joinColumn: { name: 'escolaId' } })
   escolaId: Escola[];

   @ManyToMany(() => Ficheiro, ficheiro => ficheiro, { eager: true })
   @JoinTable({ inverseJoinColumn: { name: 'id' }, joinColumn: { name: 'ficheiroId' } })
   ficheiroId: Ficheiro[];

   @Column()
   estado: boolean;
}
export default Inscricao;
