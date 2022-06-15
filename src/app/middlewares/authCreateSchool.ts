import { compareSync } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';
import { getCustomRepository } from 'typeorm';
import { SolicitacaoEscolaRepository } from './../../repositories/SolicitacaoEscolaRepository';

async function ProcurarSolicitacaoEscolaNaBaseDeDados(token: string) {
  try {
    const solicitacaoEscolaRepository = getCustomRepository(SolicitacaoEscolaRepository);

    const existSolicitacaoEscolaToken = await solicitacaoEscolaRepository.findOne({ token });

    if (!existSolicitacaoEscolaToken) return false;

    return true;
  } catch (r) {
    if (r) return r;
  }
}
async function VerificarUtilizacao(token: string) {
  try {
    const solicitacaoEscolaRepository = getCustomRepository(SolicitacaoEscolaRepository);

    const existSolicitacaoEscolaToken = await solicitacaoEscolaRepository.findOne({ token });

    if (!existSolicitacaoEscolaToken) return false;

    return true;
  } catch (r) {
    if (r) return r;
  }
}
const autenticacao = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authen } = req.params;
    const token = authen;

    if (!authen) {
      console.log(authen);
      return res.status(401).json({ message: 'token em falta!' });
    }
    verify(token, auth.key, (err, decoded) => {
      if (err) return res.status(400).json({ erro: err });
      return next();
    });
    const resultadoDaProcura = ProcurarSolicitacaoEscolaNaBaseDeDados(token);
    resultadoDaProcura
      ? () => {
          return next();
        }
      : () => {
          return res.status(404).json({ message: 'você precisa fazer uma solicitação primeiro!' });
        };
  } catch (error) {
    return res.status(500).json({ error: '=>ss' + error });
  }
};

export default autenticacao;
