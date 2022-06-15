import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { VerificandoSeUsuarioJaExiste } from '../ casoDeUso/usuario';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import Resposta from '../util/message';
import Res from '../util/message';
import { statusCode } from '../util/statusCode';

class UsuarioController {
   async store (req: Request, res: Response, next: NextFunction) {
      const schema = Yup.object().shape({
         nome: Yup.string().required(),
         sexo: Yup.string(),
         numeroDeIdentificacao: Yup.string().required(),
         dataDeNascimento: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const { nome, dataDeNascimento, sexo, numeroDeIdentificacao } = await req.body;
         const usuarioRepository = getCustomRepository(UsuarioRepository);

         const numeroDeIdentificacaoExist = await usuarioRepository.findOne({ numeroDeIdentificacao });

         if (numeroDeIdentificacaoExist) {
            return res.status(statusCode.proibido).json(Resposta(statusCode.proibido));
         }

         const usuario = usuarioRepository.create({
            nome,
            dataDeNascimento,
            sexo,
            numeroDeIdentificacao
         });
         await usuarioRepository.save(usuario);

         return res.status(201).json(Resposta(201));
      } catch (err) {
         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      }
   }

   async index (req: Request, res: Response) {
      try {
         const usuarioRepository = getCustomRepository(UsuarioRepository);

         const usuarios = await usuarioRepository.find();

         return res.status(statusCode.ok).json(usuarios);
      } catch (error) {
         console.log(error);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async getOne (req: Request, res: Response) {
      try {
         const id = req.params.id;
         const usuarioRepository = getCustomRepository(UsuarioRepository);
         const usuarioExiste = await usuarioRepository.findOne(id);
         if (usuarioExiste) {
            const result = usuarioExiste;
            return res.status(200).json(result);
         }
         return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
      } catch (error) {
         console.log(error);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }
   async update (req: Request, res: Response) {
      const schema = Yup.object().shape({
         id: Yup.string().required()
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }

      try {
         const { id } = req.params;
         const { name, numberDocument, dateBorn, documentId, fotoId } = req.body;

         const usuarioRepository = getCustomRepository(UsuarioRepository);

         const existnumeroDeIdentificacao = await usuarioRepository.findOne(numberDocument);

         const userUpdated = await usuarioRepository.update({ id }, {});
      } catch (err) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;

         const usuarioRepository = getCustomRepository(UsuarioRepository);
         const usuarioExiste = await usuarioRepository.findOne({ id });

         if (!usuarioExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const user = await usuarioRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      
      } catch (err) {
        console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }
}
export default new UsuarioController();
