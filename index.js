/* eslint-disable import/first */
/* eslint-disable no-console */
// require('module-alias/register');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Knex from 'knex';
import { Model } from 'objection';
import { auth } from 'express-openid-connect';

import database from './knexfile.cjs';
import routes from './server/routers/index';
import { me } from './server/http/middlewares';

dotenv.config({ path: '.env' });

const knex = Knex(database);
Model.knex(knex);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(me);
app.use(
  auth({
    issuerBaseURL: 'https://YOUR_DOMAIN',
    baseURL: 'https://YOUR_APPLICATION_ROOT_URL',
    clientID: 'YOUR_CLIENT_ID',
    secret: 'LONG_RANDOM_STRING',
    idpLogout: true,

  }),
);

Object.keys(routes).map((route) => app.use('/', routes[route]));

app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});
