import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { CursoRepository } from '../../repositories/CurssoRepository';
import Resposta from '../util/message';
import { statusCode } from '../util/statusCode';

class CursoController {
   async store (req: Request, res: Response, next: NextFunction) {
      const schema = Yup.object().shape({
         descricao: Yup.string(),
         nome: Yup.string().required()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const { descricao, nome } = await req.body;
         const cursoRepository = getCustomRepository(CursoRepository);

         const cursoExist = await cursoRepository.findOne({ nome });

         if (cursoExist) {
            return res.status(statusCode.proibido).json({message:"curso ja existe"});
         }

         const curso= cursoRepository.create({
           nome,
            descricao
         });

         await cursoRepository.save(curso);

         return res.status(201).json(Resposta(201));
      } catch (err) {
         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      }
   };

   async index (req: Request, res: Response) {
      try {
         const cursoRepository = getCustomRepository(CursoRepository);

         const curso= await cursoRepository.find();

         return res.status(statusCode.ok).json(curso);
      } catch (error) {
         console.log(error);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }


   async update (req: Request, res: Response) {
      const schema = Yup.object().shape({
         nome:Yup.string(),
         descricao:Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }

      try {
         const { id } = req.params;
         const { nome,descricao} = req.body;

         const cursoRepository = getCustomRepository(CursoRepository);

         const cursoExist= await cursoRepository.findOne({id});
         if(!cursoExist){
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado))
         }
         await cursoRepository.update({ id }, {nome,descricao});
         return res.status(statusCode.ok).json(Resposta(statusCode.ok))
      } catch (err) {
         console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;

         const cursoRepository = getCustomRepository(CursoRepository);
         const cursoExiste = await cursoRepository.findOne({ id });

         if (!cursoExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const curso = await cursoRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      
      } catch (err) {
        console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

}
export default new CursoController();
