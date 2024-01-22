import { Request, Response } from 'express';
const chalk = require("chalk");
const express = require('express');
const app = express()
const port = 3000

const statusSelector = (statusCode: number) => {
  switch (statusCode) {
    case 200:
      return chalk.green
    case 400:
      return chalk.yellow
    case 500:
      return chalk.red
    default:
      return chalk.blue
  }
}

app.get('/', (req: Request, res: Response) => {
  console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/" with status code ${res.statusCode}`)));
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(statusSelector(0)(`Example app listening on port ${port}`));
})