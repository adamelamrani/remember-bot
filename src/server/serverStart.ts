import { type Express } from 'express';
import statusSelector from '../utils/statusSelector';
import 'reflect-metadata';
import { AppDataSource } from './datasource-config';
import chalk from 'chalk';

const serverStart = async (
  port: number | string,
  app: Express,
): Promise<void> => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      AppDataSource.initialize()
        .then(() => {
          console.log('Database is connected');
          // here you can start to work with your database
        })
        .catch((error) => {
          console.log(error);
        });
      resolve(() => {
        console.log(
          statusSelector(0)(`Server is listening at http://localhost:${port}`),
        );
      });
    });
    server.on('error', (error) => {
      chalk.red.bold.underline(`Error on server ${error.message}`);
      reject(new Error(`Error on server ${error.message}`));
    });
  });
};

export default serverStart;
