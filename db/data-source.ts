import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.NAME,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  entities: [],
  synchronize: false,
  migrations: [],
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
