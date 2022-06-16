import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authDataSolicitacao from '../../config/auth';
import { getCustomRepository } from 'typeorm';
import './../jobs/RegistrationEmail';
import Mail from './../lib/Mail';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import bcrypt from 'bcrypt';
import { ContactoRepository } from '../../repositories/ContactoRepository';
import { TokenRepository } from '../../repositories/TokenRepository';
import { statusCode } from '../util/statusCode';
import Resposta from '../util/message';
import LoginRepository from '../../repositories/LoginRepository';

class RecuperarSenhaController {
   async send (req: Request, res: Response) {
      const schema = Yup.object().shape({
         email: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json('error validator!');
      }
      try {
         const tokenRepository = getCustomRepository(TokenRepository);

         const contactoRepository = getCustomRepository(ContactoRepository);
         const { email } = req.body;

         const existeEmail = await contactoRepository.findOne({ where: { descricao: email } });

         if (!existeEmail) {
            return res.status(statusCode.naoEncontrado).json({ mensagem: 'Email não Encontrado!' });
         }

         const token = jwt.sign({ recuperacao: { ownerId: existeEmail.usuarioId.id } }, authDataSolicitacao.key, {
            expiresIn: authDataSolicitacao.expiresIn2
         });

         const solicitacao = tokenRepository.create({
            token,
            expiracao: authDataSolicitacao.expiresIn2,
            usuario: existeEmail.usuarioId.id
         });

         const url = `${process.env.LINK_APP_FRONT}/recuperarSenha/token=${token}&id=${existeEmail.usuarioId.id}`;
         const result = await tokenRepository.save(solicitacao);
         const solicitacaoDt = await tokenRepository.findOne({
            where: { token }
         });
         console.log(solicitacaoDt);
         const usuario = existeEmail.usuarioId.nome;
         await Mail.sendMail({
            from: 'ORDENFA <ulundoantonio@gmail.com>',
            to: `${usuario} <${email}>`,
            subject: ' Recuperacao de senha',
            html: `<h1>Olá ${usuario}!<h1>
             click no link para continuar com a recuperacao de senha
            ${url}`
         });

         return res.status(200).json(result);
      } catch (error) {
         return res.status(404).json({ error: `=>${error}` });
      }
   }
;
   async receive (req: Request, res: Response) {
      try {
         const tokenRepository = getCustomRepository(TokenRepository);
         const usuarioRepository = getCustomRepository(UsuarioRepository);

         const loginRepository = getCustomRepository(LoginRepository);
         const { token, id } = req.query;
         const { novaSenha} = req.body;

         const existeToken = await tokenRepository.findOne({ where: { token } });
         if (!existeToken) {
            return res.status(statusCode.naoEncontrado).json({ mensagem: 'Utoken inválido!' });
         }

         const existeUsuario = await usuarioRepository.findOne({ where: { id: existeToken.usuario } });
         if (!existeUsuario) {
            return res.status(statusCode.naoEncontrado).json({ mensagem: 'Usuario inválido!' });
         }

         const existeLogin = await loginRepository.findOne({ where: { usuarioId: existeUsuario } });
         if (!existeLogin) {
          return res.status(statusCode.naoEncontrado).json({ mensagem: 'Usuario inválido!' });
       }
       
       const resetSenha= await loginRepository.update({id:existeLogin.id},{password:novaSenha})

       return res.status(statusCode.ok).json({ mensagem: 'Senha Recuperada com suceso!' });
    
      } catch (err) {
        console.log(err)
        return res.status(statusCode.erroInterno).json({ mensagem: 'Usuario inválido!' });
    
      }
   }
}

export default new RecuperarSenhaController();
