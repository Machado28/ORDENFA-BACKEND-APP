import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authDataSolicitacao from '../../config/auth';
import { getCustomRepository } from 'typeorm';
import './../jobs/RegistrationMailer';
import Mail from './../lib/Mail';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import bcrypt from 'bcrypt';
import { ContactoRepository } from '../../repositories/ContactoRepository';

class RecuperarSenhaController {
   async send (req: Request, res: Response) {
      const schema = Yup.object().shape({
         email: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json('error validator!');
      }
      try {
         const usuarioRepository = getCustomRepository(UsuarioRepository);
         const contactoRepository = getCustomRepository(ContactoRepository);
         const { email } = req.body;

         const existeEmail = await contactoRepository.findOne({ where: { descricao: email,tipo:{nome:"email"} } });

         const token = jwt.sign({ recuperacao: { ownerId: existeEmail.usuarioId.id } }, authDataSolicitacao.key, {
            expiresIn: authDataSolicitacao.expiresIn2
         });
         const solicitacao = solicitacaoEscolaRepository.create({
             
            token,
            email,
    
         });

         const url = `${req.baseUrl}/school/${token}`;
         const result = await solicitacaoEscolaRepository.save(solicitacao);
         const solicitacaoEscolaId = await solicitacaoEscolaRepository.findOne({
            where: { token }
         });
         console.log(solicitacaoEscolaId.id);

         await Mail.sendMail({
            from: 'Portal das Escolas <dlinecode@gmail.com>',
            to: `${nomeCliente} <${email}>`,
            subject: ' Teste de envio',
            html: `Olá ${nomeCliente}!  Click no link para continuar com o cadastro da tua instituição!${url}`
         });

         return res.status(200).json(result);
      } catch (error) {
         return res.status(404).json({ error: `=>${error}` });
      }
   }
}

export default new RecuperarSenhaController();
