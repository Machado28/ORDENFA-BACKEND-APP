import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authData from '../../config/auth';
import LoginRepository from '../../repositories/LoginRepository';
import { ContactoRepository } from '../../repositories/ContactoRepository';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';

class SessionsController {
   async store (req: Request, res: Response) {
      try {
         const loginRepository = getCustomRepository(LoginRepository);
         const contactoRepository = getCustomRepository(ContactoRepository);
         const usuarioRepository = getCustomRepository(UsuarioRepository);

         const { contacto, password } = req.body;

         const contactExists = await contactoRepository.findOne({
            where: { descricao: contacto }
         });
         if (!contactExists) {
          return res.status(401).json({ errror: 'Login inválido!' });
       }
         const usuario = await usuarioRepository.findOne({
            where: { id: contactExists.usuarioId.id }
         });

         
         if (!usuario) {
            return res.status(401).json({ errror: 'Login inválido!' });
         }

         const login = await loginRepository.findOne({
            where: { contactoId: contactExists.id }
         });

         if (!login) {
            return res.status(400).json({ error: 'Login ou senha inválido!!' });
         }

         const isValidPassword = bcrypt.compareSync(password, login.password);

         if (!isValidPassword) {
            return res.status(401).json({ error: 'Login ou senha inválido!' });
         }

         const token = jwt.sign({ session: { usuarioId: login.usuarioId } }, authData.key, {
            expiresIn: authData.expiresIn
         });

         return res.status(200).json({
            login,
            token
         });
      } catch (erro) {
         return res.status(500).json(erro);
      }
   }
}
export default new SessionsController();
