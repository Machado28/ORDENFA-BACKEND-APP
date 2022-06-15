import { EntityRepository, Repository } from 'typeorm';
import { HabilitacaoProfissional } from '../app/models/HabilitacaoProfissional';

@EntityRepository(HabilitacaoProfissional)
export class HabilitacaoProfissionalRepository extends Repository<HabilitacaoProfissional> {}
