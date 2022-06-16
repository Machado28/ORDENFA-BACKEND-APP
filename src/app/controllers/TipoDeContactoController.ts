import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { TipoDeContactoRepository } from '../../repositories/TipoDeContactoRepository';
import Resposta from '../util/message';
import Res from '../util/message';
import { statusCode } from '../util/statusCode';

class TipoDeContactoController {
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
         const tipoDeContactoRepository = getCustomRepository(TipoDeContactoRepository);

         const tipoDeContactoExist = await tipoDeContactoRepository.findOne({ nome });

         if (tipoDeContactoExist) {
            return res.status(statusCode.proibido).json(Resposta(statusCode.proibido));
         }

         const tipoDeContacto = tipoDeContactoRepository.create({
           nome,
            descricao
         });

         await tipoDeContactoRepository.save(tipoDeContacto);

         return res.status(201).json(Resposta(201));
      } catch (err) {
         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      }
   };

   async index (req: Request, res: Response) {
      try {
         const tipoDeContactoRepository = getCustomRepository(TipoDeContactoRepository);

         const tipoDeContactos= await tipoDeContactoRepository.find();

         return res.status(statusCode.ok).json(tipoDeContactos);
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

         const tipoDeContactoRepository = getCustomRepository(TipoDeContactoRepository);

         const tipoDeContactoExist= await tipoDeContactoRepository.findOne({id});
         if(!tipoDeContactoExist){
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado))
         }
         await tipoDeContactoRepository.update({ id }, {nome,descricao});
         return res.status(statusCode.ok).json(Resposta(statusCode.ok))
      } catch (err) {
         console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

}
export default new TipoDeContactoController();
