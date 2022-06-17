import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/index';
import path from 'path'
import cors from 'cors'
const server = express();

server.use('/files', express.static(path.resolve("tmp", "uploads")));

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    server.use(cors());
    next();
});

server.use(express.json());

server.use(routes);

const port =process.env.PORT || 6666
server.listen(process.env.PORT, () => {
  console.log('server started on port ' + port);
});
