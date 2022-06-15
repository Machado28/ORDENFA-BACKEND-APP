import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

abstract class DataDefault {
  @CreateDateColumn()
  createdAt: 'timestamp';

  @CreateDateColumn()
  updatedAt: 'timestamp';
}
//substituição de nomeclatur prevista de ContentTamplate para DadosComum
abstract class UsuarioDefault extends DataDefault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  sexo: string;

  @Column({ type: 'varchar', nullable: true })
  dataDeNascimento: string;
  
  @Column({ type: 'varchar', nullable: true })
  numeroDeIdentificacao: string;
}

abstract class TabelaDefault extends DataDefault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  descricao: string;
}

class DataValidadeDefault {
  @Column()
  inicio: Date;

  @Column()
  fim: Date;
}
export {
  DataDefault,
  UsuarioDefault,
  TabelaDefault,
  DataValidadeDefault
};
