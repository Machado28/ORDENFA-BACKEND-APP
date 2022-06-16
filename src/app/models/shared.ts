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

abstract class TokenDefault extends DataDefault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;

  @Column({ type: 'varchar', nullable: true })
  expiracao: string;
  
  @Column({ type: 'varchar', nullable: true })
  usuario: string;
}

class DataValidadeDefault {
  @Column()
  inicio: Date;

  @Column()
  fim: Date;
}
export {
  TokenDefault,
  DataDefault,
  UsuarioDefault,
  TabelaDefault,
  DataValidadeDefault
};
