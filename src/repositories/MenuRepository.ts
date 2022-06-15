import { EntityRepository, Repository } from "typeorm";
import {Menu} from "../app/models/Menu";

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
