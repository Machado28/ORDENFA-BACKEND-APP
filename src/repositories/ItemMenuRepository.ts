import { EntityRepository, Repository } from 'typeorm';
import { ItemMenu } from '../app/models/ItemMenu';

@EntityRepository(ItemMenu)
export class ItemMenuRepository extends Repository<ItemMenu> {}
