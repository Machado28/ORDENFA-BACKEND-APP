import { EntityRepository, Repository } from 'typeorm';
import { File } from '../app/models/File';

@EntityRepository(File)
export class FileRepository extends Repository<File> {}
