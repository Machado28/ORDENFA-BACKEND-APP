import { EntityRepository, Repository } from 'typeorm';
import Nationality from '../app/models/Nationality';

@EntityRepository(Nationality)
class NationalityRepository extends Repository<Nationality> {}
export default NationalityRepository;
