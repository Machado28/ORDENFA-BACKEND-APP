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
   }
}
export default new TipoDeContactoController();
