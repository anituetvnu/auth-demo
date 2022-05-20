/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Knex from 'knex';
import { Model } from 'objection';

import database from './knexfile';

dotenv.config({ path: '.env' });

const knex = Knex(database);
Model.knex(knex);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.send('Api not found');
});

app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});
