import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/index';

const server = express();

server.use(express.json());
server.use(routes);

const port =process.env.PORT || 6666
server.listen(process.env.PORT, () => {
  console.log('server started on port ' + port);
});
