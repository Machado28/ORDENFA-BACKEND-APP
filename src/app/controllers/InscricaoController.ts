import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { CursoRepository } from '../../repositories/CurssoRepository';
import { EscolaRepository } from '../../repositories/EscolaRepository';
import { FicheiroRepository } from '../../repositories/FicheiroRepository';
import { InscricaoRepository } from '../../repositories/InscricaoRepository';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import Resposta from '../util/message';
import { statusCode } from '../util/statusCode';

class InscricaoController {
   async store (req: Request, res: Response, next: NextFunction) {
      const schema = Yup.object().shape({
         cursoId: Yup.string().required(),
         usuarioId: Yup.string().required(),
         escolaId:Yup.array().required(),
        documentoId:Yup.array()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroExterno).json(Resposta(statusCode.erroExterno));
      }

      try {
         const { cursoId, usuarioId, escolaIds, documentoId } = await req.body;
        console.log(documentoId)
         const cursoRepository = getCustomRepository(CursoRepository);
         const inscricaoRepository = getCustomRepository(InscricaoRepository);
         const usuarioRepository = getCustomRepository(UsuarioRepository);
         const escolaRepository = getCustomRepository(EscolaRepository);
         const ficheiroRepository = getCustomRepository(FicheiroRepository);

         const cursoExist = await cursoRepository.findOne({ where: { id: cursoId } });
         const usuarioExist = await usuarioRepository.findOne({ where: { id: usuarioId } });
         const escolaExiste = await escolaRepository.findByIds([escolaIds]);
         const ficheiroExiste = await ficheiroRepository.findByIds(documentoId);
         
    console.log(ficheiroExiste)
         if (!cursoExist) {
            return res.status(statusCode.naoEncontrado).json({ mensagem: 'curso não encontrado' });
         }

         console.log(ficheiroExiste)

         if (!usuarioExist) {
            return res.status(statusCode.naoEncontrado).json({ mensagem: 'usuário não encontrado' });
         }

         const inscricaoExist = await inscricaoRepository.findOne({ where: { membroId: usuarioId } });

         if (inscricaoExist) {
            return res.status(statusCode.proibido).json({ mensagem: ' já inscrito!' });
         }
         if (!ficheiroExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const inscricao = inscricaoRepository.create({
            cursoId: cursoExist,
            membroId: usuarioExist,
            escolaId:escolaExiste,
           ficheiroId:ficheiroExiste,
            estado: false
         });

         await inscricaoRepository.save(inscricao);

         return res.status(statusCode.criado).json(Resposta(statusCode.criado));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async index (req: Request, res: Response) {
      try {
         const inscricaoRepository = getCustomRepository(InscricaoRepository);

         const inscritos = await inscricaoRepository.find();

         return res.status(statusCode.ok).json(inscritos);
      } catch (error) {
         console.log(error);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async update (req: Request, res: Response) {
      const schema = Yup.object().shape({
         nome: Yup.string(),
         descricao: Yup.string()
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }

      try {
         const { id } = req.params;
         const { cursoId } = req.body;

         const cursoRepository = getCustomRepository(CursoRepository);
         const inscricaoRepository = getCustomRepository(InscricaoRepository);

         const cursoExist = await cursoRepository.findOne({ id });

         if (!cursoExist) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         await inscricaoRepository.update({ id }, { cursoId: cursoExist });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }
   async changeState (req: Request, res: Response) {
      const schema = Yup.object().shape({
        estado: Yup.string().required()
        
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }

      try {
         const { id } = req.params;
         const { estado } = req.body;

         const cursoRepository = getCustomRepository(CursoRepository);
         const inscricaoRepository = getCustomRepository(InscricaoRepository);

         const inscricaoExist = await inscricaoRepository.findOne({ id });

         if (!inscricaoExist) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         await inscricaoRepository.update({ id }, { estado});
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;
         const inscricaoRepository = getCustomRepository(InscricaoRepository);
         const inscricaoExiste = await inscricaoRepository.findOne({ id });

         if (!inscricaoExiste) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }

         const inscrito = await inscricaoRepository.delete({ id });
         return res.status(statusCode.ok).json(Resposta(statusCode.ok));
      } catch (err) {
         console.log(err);
         return res.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno));
      }
   }
}
export default new InscricaoController();
