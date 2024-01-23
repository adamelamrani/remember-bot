import { Request, Response } from 'express';
const statusSelector = require('../utils/statusSelector');

const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/" with status code ${res.statusCode}`)));
  res.send('Hello World!');
})

module.exports = app;