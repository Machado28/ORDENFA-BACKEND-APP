import { EntityRepository, Repository } from 'typeorm';
import Contacto from '../app/models/Contacto';

@EntityRepository(Contacto)
export class ContactoRepository extends Repository<Contacto> {}
