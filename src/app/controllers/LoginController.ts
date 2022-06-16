import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import LoginRepository from '../../repositories/LoginRepository';
import { ContactoRepository } from '../../repositories/ContactoRepository';
import { statusCode } from '../util/statusCode';
import Resposta from '../util/message';
import * as Yup from 'yup';

class LoginController {
   async index (req: Request, res: Response) {
      try {
         const loginRepository = getCustomRepository(LoginRepository);
         const login = await loginRepository.find();
         return res.status(200).json(login);
      } catch (err) {
         return res.status(500).json({ message: `Ocorreu um erro inesperado no servidor :${err}` });
      }
   }

   async store (req: Request, res: Response) {
      const schema = Yup.object().shape({
         contacto: Yup.string().required(),
         password: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const loginRepository = getCustomRepository(LoginRepository);
         const contactoRepository = getCustomRepository(ContactoRepository);

         const { password, contacto } = req.body;
         const existContacto = await contactoRepository.findOne({
            where: { descricao: contacto }
         });
         if (!existContacto) {
            return res.status(404).json({ error: 'Contacto não encontrado!' });
         }
         const existLogin = await loginRepository.findOne({
            where: { contactoId:  existContacto.id }
         });
         if (existLogin) {
            return res.status(400).json({ error: 'Contacto já existe!!' });
         }
         const contactId = await contacto.id;
         const { usuarioId } = await contacto;
         const login = loginRepository.create({
            contactoId: existContacto,
            usuarioId,
            password
         });
         await loginRepository.save(login);
         return res.status(200).json({ login });
      } catch (err) {
         return res.status(500).json({ message: `Ocorreu um erro inesperado no servidor :${err}` });
      }
   }
}

export default new LoginController();
