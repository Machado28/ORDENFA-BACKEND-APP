import bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Contacto from './Contacto';
 
import Usuario from './Usuario';

@Entity('login')
  class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => Contacto, contacto => contacto, { eager: true })
  @JoinColumn({ name: 'contactoId' })
  contactoId: Contacto;

  @OneToOne(() => Usuario, usuarioId => usuarioId, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuarioId: Usuario;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
export default Login;