import { EntityRepository, Repository } from 'typeorm';
import { EscolaAnterior } from '../app/models/EscolaAnterior';

@EntityRepository(EscolaAnterior)
class EscolaAnteriorRepository extends Repository<EscolaAnterior> {}
export default EscolaAnteriorRepository;
