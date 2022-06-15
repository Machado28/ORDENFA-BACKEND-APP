import { EntityRepository, Repository } from 'typeorm';
import Document from '../app/models/Document';
@EntityRepository(Document)
export class DocumentRepository extends Repository<Document> {}
