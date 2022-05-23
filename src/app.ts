import 'module-alias/register';
import dotenv from 'dotenv'
dotenv.config();
import express, { Express, NextFunction, Request, Response }  from 'express';
import {createServer, Server} from 'http';
import {join, resolve} from 'path';
import {Server as SocketServer} from 'socket.io';

import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';

import "@redis/index";
//require('@redis/index');

import { sessionOption } from '@utils/sessionHelper';
import { checkAuth } from '@middleware/auth/checkAuth';
import { errorHandeler } from '@middleware/error';
import { router } from '@router/index';
import { setCors } from '@middleware/headers';

const app: Express = express();
const PORT = 8080;

const server : Server = createServer(app);
const io : SocketServer = new SocketServer(server);

app.set('view engine', 'ejs');
app.set('views', join(resolve(__dirname, '..'), 'views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static(join(resolve(__dirname, '..'), "public")));
app.use(express.urlencoded({limit: '10mb', extended: false}));


app.use(sessionOption);
app.use('/*', setCors);
app.use(checkAuth);

router(app);
app.use(errorHandeler);

//socket
app.set('socket', io);

app.listen(PORT, () => {
  console.log(`Application Running on port ==> ${PORT}.`);
});