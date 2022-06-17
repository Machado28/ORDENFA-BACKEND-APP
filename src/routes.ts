import { Request, Response, Router } from 'express';
import multer from 'multer';
import { ContactoController, CursoController, EscolaController, InscricaoController, LoginController, RecuperarSenhaController, SessionController, TipoDeContactoController, UsuarioController } from './app/controllers';
import TipoDeFicheiroController from './app/controllers/TipoDeFicheiroController';
import { multerconfig } from './config/multer';
import FicheiroController from './app/controllers/FicheiroController';
import express from 'express'
const routes = Router();
routes.get('/', (req: Request, res: Response) => {
  return res.status(400).json({ message: 'running well' });
});

const upload = multer(multerconfig);
express().use('/files',express.static("uploads"))
routes.post('/upload/:tipoId', upload.single('file'), FicheiroController.store);
routes.delete('/upload/:id', FicheiroController.delete);
express().use('/files',express.static("uploads"))
routes.post('/usuario',UsuarioController.store);
routes.get('/usuarios', UsuarioController.index);
routes.delete('/usuario/:id', UsuarioController.delete);
routes.put('/usuario/:id', UsuarioController.update);

routes.post('/tipodecontacto', TipoDeContactoController.store);
routes.get('/tipodecontacto', TipoDeContactoController.index);
routes.put('/tipodecontacto/:id', TipoDeContactoController.update);
routes.delete('/tipodecontacto/:id', TipoDeContactoController.delete);

routes.post('/inscricao', InscricaoController.store);
routes.get('/inscricao',InscricaoController.index);
routes.put('/inscricao/:id',InscricaoController.update);
routes.delete('/inscricao/:id', InscricaoController.delete);

routes.post('/escola', EscolaController.store);
routes.get('/escola',EscolaController.index);
routes.put('/escola/:id',EscolaController.update);
routes.delete('/escola/:id', EscolaController.delete);

routes.get('/contactos',ContactoController.index);
routes.post('/contacto',ContactoController.store);

routes.get('/tipodeficheiro',TipoDeFicheiroController.index);
routes.post('/tipodeficheiro',TipoDeFicheiroController.store);

routes.post('/session',SessionController.store);

routes.get('/login',LoginController.index);
routes.post('/login',LoginController.store);

routes.post('/curso',CursoController.store);
routes.get('/curso',CursoController.index);
routes.delete('/curso/:id',CursoController.delete);
routes.put('/curso/:id',CursoController.update);

routes.post('/solicitarRecuperacao',RecuperarSenhaController.send);
routes.post('/resetPassword/',RecuperarSenhaController.receive);
export default routes;
