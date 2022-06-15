import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SchoolRepository } from '../../repositories/SchoolRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { FuncionarioRepository } from '../../repositories/FuncionarioRepository';

class Permission {
  async run(req: Request, res: Response, next: NextFunction) {
    const BuscarRotaAcessada = () => {
      const path = req.path.split('/');
      const rotaAcessada = `${req.method.toLocaleLowerCase()}_${path[1].toLocaleLowerCase()}`;
      return rotaAcessada;
    };
    try {
      //#region : Acesso de usuário
      const usuarioRepository = getCustomRepository(UserRepository);
      const escolaRepository = getCustomRepository(SchoolRepository);
      const { usuario } = req.session;
      const Usuario = await usuarioRepository.findOne({ where: { id: usuario.id } });
      const Escola = await escolaRepository.findOne({ where: { donoId: Usuario } });
      let administrador = false;

      if (!Usuario) {
        return res.status(400).json({ message: 'você precisa fazer o login.' });
      }
      if (Usuario.role.description === 'administrador') {
        administrador = true;
        next();
      }
      if (Usuario.role.description !== 'administrador' && Usuario.role.description !== 'dono') {
        return res.status(401).json({ message: 'usuário Inválido.' });
      }

      if (!Escola && administrador === false) {
        return res.status(401).json({ message: 'você não possui nenhuma escola.' });
      }
      const rotaAcessada = BuscarRotaAcessada();
      const PermissaoModuloEscola = Escola.moduloId?.tarefaId.filter(
        tarefa => tarefa.nome.toLowerCase() === rotaAcessada
      );
      if (!PermissaoModuloEscola) {
        return res.status(401).json({
          error: `Você não tem permissão suficiente!\n o môdulo ${Escola.moduloId.nome} não possui esta funcionalidade!`,
        });
      } else {
        next();
      }
      //#endregion

      //#region : Acesso de funcionário
      const funcionarioRepository = getCustomRepository(FuncionarioRepository);
      const { funcionario } = req.session;
      const Funcionario = await funcionarioRepository.findOne({ where: { id: funcionario } });
      const EscolaFuncionario = await escolaRepository.findOne({
        where: { id: funcionario.escola.id },
      });

      if (!Funcionario || !EscolaFuncionario) {
        return res.status(400).json({ message: 'você precisa fazer o login.' });
      }
      const tarefaIndividualNaEscola = Funcionario.tarefaId.filter(
        tarefa => tarefa.nome.toLowerCase() === rotaAcessada
      );
      const tarefaDoCargoNaEscola = Funcionario.cargoEscolaId?.tarefaId.filter(
        tarefa => tarefa.nome.toLowerCase() === rotaAcessada
      );
      const tarefaDoCargoPadraoEscolar = Funcionario.cargoEscolaId.cargoId?.tarefaId.filter(
        tarefa => tarefa.nome.toLowerCase() === rotaAcessada
      );
      const moduloDaEscola = Funcionario.escola.moduloId.tarefaId.filter(
        tarefa => tarefa.nome.toLocaleLowerCase() === rotaAcessada
      );

      if (moduloDaEscola && tarefaIndividualNaEscola) {
        return next();
      }
      if (moduloDaEscola && tarefaDoCargoPadraoEscolar) {
        return next();
      }
      if (moduloDaEscola && tarefaDoCargoNaEscola) {
        return next();
      }
      //#endregion
      return res.status(401).json({
        message:
          'você não tem permissão suficiente para executar esta acção. consulte o seu  administrador!',
      });
    } catch (erro) {
      return res.status(500).json({ erro: `erro de acesso inesperado : ${erro}` });
    }
  }
}
export default new Permission();
