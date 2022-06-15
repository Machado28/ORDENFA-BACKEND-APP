import { EntityRepository, Repository } from 'typeorm';
import ClasseEscola from '../app/models/ClasseEscola';

@EntityRepository(ClasseEscola)
class ClasseEscolaRepository extends Repository<ClasseEscola> {}
export default ClasseEscolaRepository;
