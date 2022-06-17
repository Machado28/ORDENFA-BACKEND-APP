import { EntityRepository, Repository } from 'typeorm';
import Token from '../app/models/Token';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
