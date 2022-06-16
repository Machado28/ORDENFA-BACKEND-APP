import { Request, Response, Router } from 'express';
import multer from 'multer';
import { TipoDeContactoController, UsuarioController } from './app/controllers';
import { multerconfig } from './config/multer';

const routes = Router();
routes.get('/', (req: Request, res: Response) => {
  return res.status(400).json({ message: 'running well' });
});

const upload = multer(multerconfig);

routes.post('/usuario', UsuarioController.store);
routes.get('/usuarios', UsuarioController.index);
routes.delete('/usuario/:id', UsuarioController.delete);

routes.post('/tipodecontacto', TipoDeContactoController.store);
routes.get('/tipodecontacto', TipoDeContactoController.index);
routes.put('/tipodecontacto/:id', TipoDeContactoController.update);
routes.delete('/tipodecontacto/:id', TipoDeContactoController.delete);
export default routes;
