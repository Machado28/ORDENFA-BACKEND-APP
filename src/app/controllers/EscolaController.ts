import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { EscolaRepository } from '../../repositories/EscolaRepository';
import Resposta from '../util/message';
import { statusCode } from '../util/statusCode';

class EscolaController {
   async store (req: Request, res: Response, next: NextFunction) {
      const schema = Yup.object().shape({
         tipo: Yup.string(),
         nome: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const { tipo, nome } = await req.body;
         const escolaRepository = getCustomRepository(EscolaRepository);

         const escolaExist = await escolaRepository.findOne({ nome });

         if (escolaExist) {
            return res.status(201).json(Resposta(201));
         }

         const escola = escolaRepository.create({
            nome,
            tipo
         });

         await escolaRepository.save(escola);

         return res.status(201).json(Resposta(201));
      } catch (err) {
         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      }
   }

   async index (req: Request, res: Response) {
      try {
         const escolaRepository = getCustomRepository(EscolaRepository);

         const escolas = await escolaRepository.find();

         return res.status(statusCode.ok).json(escolas);
      } catch (error) {
         console.log(error);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async update (req: Request, res: Response) {
      const schema = Yup.object().shape({
         nome: Yup.string(),
         tipo: Yup.string()
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }

      try {
         const { id } = req.params;
         const { nome, tipo } = req.body;

         const escolaRepository = getCustomRepository(EscolaRepository);

         const escolaExist = await escolaRepository.findOne({ id });
         if (!escolaExist) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         await escolaRepository.update({ id }, { nome, tipo });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;

         const escolaRepository = getCustomRepository(EscolaRepository);
         const usuarioExiste = await escolaRepository.findOne({ id });

         if (!usuarioExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const user = await escolaRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }
}
export default new EscolaController();
