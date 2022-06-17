import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { TipoDeFicheiroRepository } from '../../repositories/TipoDeFicheiroRepository';
import Resposta from '../util/message';
import Res from '../util/message';
import { statusCode } from '../util/statusCode';

class TipoDeFicheiroController {
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
         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);

         const tipoDeFicheiroExist = await tipoDeFicheiroRepository.findOne({ nome });

         if (tipoDeFicheiroExist) {
            return res.status(statusCode.proibido).json(Resposta(statusCode.proibido));
         }

         const tipoDeFicheiro = tipoDeFicheiroRepository.create({
           nome,
            descricao
         });

         await tipoDeFicheiroRepository.save(tipoDeFicheiro);

         return res.status(201).json(Resposta(201));
      } catch (err) {
         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      }
   };

   async index (req: Request, res: Response) {
      try {
         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);

         const tipoDeFicheiros= await tipoDeFicheiroRepository.find();

         return res.status(statusCode.ok).json(tipoDeFicheiros);
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

         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);

         const tipoDeFicheiroExist= await tipoDeFicheiroRepository.findOne({id});
         if(!tipoDeFicheiroExist){
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado))
         }
         await tipoDeFicheiroRepository.update({ id }, {nome,descricao});
         return res.status(statusCode.ok).json(Resposta(statusCode.ok))
      } catch (err) {
         console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;

         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);
         const usuarioExiste = await tipoDeFicheiroRepository.findOne({ id });

         if (!usuarioExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const user = await tipoDeFicheiroRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      
      } catch (err) {
        console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

}
export default new TipoDeFicheiroController();
