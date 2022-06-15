import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/index';

const server = express();

server.use(express.json());
server.use(routes);

const port =process.env.PORT || 6666
server.listen(process.env.PORT, () => {
  console.log(`
"name": "App-backend-Ordenfa",
"version": "1.0.0",
"main": "index.js",
"repository": "https://github.com/Machado28/app-backend-ordenfa.git",
"author": "Antonio Machado <ulundanto@gmail.com>",
"license": "MIT",`)
  console.log('server started on port ' + port);
});
