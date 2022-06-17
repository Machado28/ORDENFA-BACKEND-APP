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
import { TokenDefault } from './shared';
 
import Usuario from './Usuario';

@Entity('token')
  class Token  extends TokenDefault{
}
export default Token;