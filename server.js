const app = require('./app');
const knex = require('knex');
const { NODE_ENV, PORT, DATABASE_URL, TEST_DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: NODE_ENV.toLowerCase() == 'test' ? TEST_DATABASE_URL : DATABASE_URL,
    ssl: true,
  }
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});