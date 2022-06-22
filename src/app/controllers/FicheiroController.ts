import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FicheiroRepository } from '../../repositories/FicheiroRepository';
import { TipoDeFicheiroRepository } from '../../repositories/TipoDeFicheiroRepository';
import Resposta from '../util/message';
import { statusCode } from '../util/statusCode';
import { InscricaoRepository } from '../../repositories/InscricaoRepository';

class FicheiroController {
   async store (req: Request, res: Response) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         path: Yup.string(),
         TipoId: Yup.string()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json(Resposta(statusCode.erroExterno));
      }
      try {
         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);

         const ficheiroRepository = getCustomRepository(FicheiroRepository);
         const { tipoId } = await req.params;
         const { originalname: name, filename: path, size, destination: diretorio } = req.file;
         const existTipoDeFicheiro = await tipoDeFicheiroRepository.findOne({ where: { id: tipoId } });
         console.log(tipoId);
         if (!existTipoDeFicheiro) {
            console.log(existTipoDeFicheiro);
            return res.status(404).json({ message: 'Tipo Not Exists!' });
         }

         const Ficheiro = ficheiroRepository.create({
            nome: name,
            path,
            url: "https//localhost:"+process.env.PORT+":/files/"+path,
            tipo: existTipoDeFicheiro
         });
         await ficheiroRepository.save(Ficheiro);
         return res.status(201).json(`${Ficheiro}  tamanho:${(size / 1024) ^ 3}MB   directorio${diretorio}`);
      } catch (error) {
         return res.status(500).json({ error: `error -->${error}` });
      }
   }

   async getOne(req: Request, res: Response) {
      try {
         const { inscricaoId,id} = req.params;
         const inscricaoRepository = getCustomRepository(InscricaoRepository);
         const existInscricao = await inscricaoRepository.findOne({ where: {id: inscricaoId } });
         if (!existInscricao) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         const documento = existInscricao.ficheiroId.filter(file => file.id===id);
         return res.status(200).json(documento);
      } catch (error) {
         return res.status(500).json({ error: 'error' });
      }
   }

   async index (req: Request, res: Response) {
      try {
         const { inscricaoId } = req.params;
         const inscricaoRepository = getCustomRepository(InscricaoRepository);
         const existInscricao = await inscricaoRepository.findOne({ where: {id: inscricaoId } });
         if (!existInscricao) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         const documentos = existInscricao.ficheiroId.filter(file => file);
         return res.status(200).json(documentos);
      } catch (error) {
         return res.status(500).json({ error: 'error' });
      }
   }

   async getAll (req: Request, res: Response) {
      try {
         
         const ficheiroRepository = getCustomRepository(FicheiroRepository);
         const existficheiro = await ficheiroRepository.find();
         if (!existficheiro) {
            return res.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado));
         }
         const documentos=existficheiro
         return res.status(200).json(documentos);
      } catch (error) {
         return res.status(500).json({ error: 'error' });
      }
   }

   async update (req: Request, res: Response) {
      const schema = Yup.object().shape({
         nome: Yup.string(),
         path: Yup.string(),
         TipoId: Yup.string()
      });
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json(Resposta(statusCode.erroExterno));
      }
      try {
         const ficheiroRepository = getCustomRepository(FicheiroRepository);
         const { id } = req.params;
         const { originalname: nome, filename: path } = req.file;
         const tipoDeFicheiroRepository = getCustomRepository(TipoDeFicheiroRepository);
         const FicheiroOld = await ficheiroRepository.findOne({ id });
         if (!FicheiroOld) {
            return res.status(404).json({ message: 'Ficheiro not found ' });
         }
         const updatedOneFicheiro = 1;
         const Ficheiro = await ficheiroRepository.update(
            {
               id
            },
            {
               nome,
               path
            }
         );
         if (Ficheiro.affected === updatedOneFicheiro) {
            const FicheiroUpdated = await ficheiroRepository.findOne({ id });
            return res.status(200).json({ FicheiroOld, FicheiroUpdated });
         }
      } catch (error) {
         return res.status(500).json({ error: 'error' });
      }
   }

   async delete (req: Request, res: Response) {
      try {
         const { id } = req.params;
         const ficheiroRepository = getCustomRepository(FicheiroRepository);
         const existFicheiro = await ficheiroRepository.findOne({ id });
         if (!existFicheiro) {
            return res.status(404).json({ message: 'Ficheiro not found' });
         }
         const deletedOneFicheiro = 1;
         const Ficheiro = await ficheiroRepository.delete({ id });
         if (Ficheiro.affected === deletedOneFicheiro) {
            const FicheiroDeleted = existFicheiro;
            return res.status(200).json({ message: 'Ficheiro deleted with success!' });
         }
      } catch (error) {
         return res.status(500).json({ error: 'error' });
      }
   }
}

export default new FicheiroController();
