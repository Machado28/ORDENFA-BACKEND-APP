import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerconfig } from './config/multer';

const routes = Router();
routes.get('/', (req: Request, res: Response) => {
  return res.status(400).json({ 
  "name": "App-backend-Ordenfa",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/Machado28/app-backend-ordenfa.git",
  "author": "Antonio Machado <ulundanto@gmail.com>",
  "license": "MIT",});
});

const upload = multer(multerconfig);
 

export default routes;
