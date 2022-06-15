import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//import { promisify } from 'util';
import authData from '../../config/auth';
import School from '../models/School';
import User from '../models/User';
import { Funcionario } from '../models/Funcionario';

declare module 'express-session' {
  interface SessionData {
    usuario: User;
        escola: School;
        funcionario: Funcionario;
  }
}
class Autenticacao {
  async auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: 'Token not provided', status: 400 });
    }
    const [, token] = authHeader.split(' ');

    try {
      jwt.verify(token, authData.key, (err, decoded) => {
        if (err) return res.status(400).json({ error: `error: ${err}` });
        req.session = decoded?.session;
        return next();
      });
    } catch (err) {
      return res.status(400).json({ error: 'falha na autenticação!', err });
    }
  }
}
export default new Autenticacao();
