import { Model } from 'objection';
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE

const db = knex({
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    ssl: { rejectUnauthorized: false },
    sslmode: 'require',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

export { db };

export class Task extends Model {
  static get tableName() {
      return 'tasks';
  }
}

export async function createTasksTable() {
  if (await db.schema.hasTable('tasks')) {
    return;
  } else {
    await db.schema.createTable('tasks', table => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('status');
    });
    console.log('Tabela Tasks criada com sucesso');
  }
}

Model.knex(db);
