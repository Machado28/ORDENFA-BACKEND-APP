import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { ContactoRepository } from '../../repositories/ContactoRepository';
import { TipoDeContactoRepository } from '../../repositories/TipoDeContactoRepository';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import Resposta from '../util/message';
import Res from '../util/message';
import { statusCode } from '../util/statusCode';

class ContactoController {
   async store (req: Request, res: Response, next: NextFunction) {
      const schema = Yup.object().shape({
         descricao: Yup.string().required(),
         tipoId:Yup.string().required(),
         usuarioId:Yup.string().required(),
         

      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const{ descricao,tipoId,usuarioId}=await req.body
         
        
         const tipoDeContactoRepository = getCustomRepository(TipoDeContactoRepository);
         const contactoRepository = getCustomRepository(ContactoRepository);
         const usuarioRepository = getCustomRepository(UsuarioRepository);
       
         const tipoDeContactoExist = await tipoDeContactoRepository.findOne( tipoId );
         const contactoExist = await contactoRepository.findOne({ descricao });
         const usuarioExist = await usuarioRepository.findOne({where:{id:usuarioId} });

          if (contactoExist) {
            return res.status(statusCode.proibido).json({mensagem:'contacto já existe!'});
         }
         if (!tipoDeContactoExist) {
            return res.status(statusCode.naoEncontrado).json({mensagem:'tipo de contacto não encontrado'});
         }
         if (!usuarioExist) {
            return res.status(statusCode.naoEncontrado).json({mensagem:'usuário não encontrado'});
         }
 
         const contacto = contactoRepository.create({
            descricao,
            tipo:tipoDeContactoExist,
            usuarioId:usuarioExist
         });
          
         await contactoRepository.save(contacto);

         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      } catch (err) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   };

   async index (req: Request, res: Response) {
      try {
         const contactoRepository = getCustomRepository(ContactoRepository);

         const contactos= await contactoRepository.find();

         return res.status(statusCode.ok).json(contactos);
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

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;

         const tipoDeContactoRepository = getCustomRepository(TipoDeContactoRepository);
         const usuarioExiste = await tipoDeContactoRepository.findOne({ id });

         if (!usuarioExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const user = await tipoDeContactoRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      
      } catch (err) {
        console.log(err)
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

}
export default new ContactoController();
