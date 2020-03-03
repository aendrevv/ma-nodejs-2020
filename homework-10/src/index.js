const { client } = require('./pgclient');

const createTableScrypt = `CREATE table if not exists users
(
  Id SERIAL PRIMARY KEY,
  Login VARCHAR(64) NOT NULL UNIQUE,
  Password VARCHAR(64) NOT NULL,
  Age INTEGER DEFAULT 18,
  Token varchar(128)
)`;

const insertUserScrypt = `INSERT INTO users(login, password, age, token) VALUES($1, $2, $3, $4) RETURNING *`;
const values = [
  ['andrew tolmachov', 'password_1', 30, 'tokenFirst'],
  ['petro poroshenko', 'password_2', 66, 'tokenSecond'],
  ['leonid kuchma', 'password_3', 77, 'tokenThird'],
  ['boris yeltsin', 'password_4', 88, 'tokenFourth'],
];

const createTable = async (pgclient, scrypt) => {
  const res = await pgclient.query(scrypt);
}

const addUser = async (pgclient, scrypt, values) => {
  const res = await pgclient.query(scrypt, values);
}

const deleteTable = async (pgclient) => {
  const res = await pgclient.query('DROP table users');
}

const selectByAge = async (pgclient) => {
  const res = await pgclient.query('SELECT * FROM users WHERE Age >= 50');
}

const updateAge = async (pgclient) => {
  const res = await pgclient.query('UPDATE users SET Age = Age + 1');
}

const deleteByLogin = async (pgclient, login) => {
  const res = await pgclient.query(`DELETE FROM users WHERE Login = $1`, [login]);
}

const init = async () => {
  try {
    await client.connect();
    
    await createTable(client, createTableScrypt);

    await Promise.all([
      addUser(client, insertUserScrypt, values[0]),
      addUser(client, insertUserScrypt, values[1]),
      addUser(client, insertUserScrypt, values[2]),
      addUser(client, insertUserScrypt, values[3]),
    ]);

    await deleteByLogin(client, 'leonid kuchma');

    client.end();
  } catch (error) {
    client.end();
    console.error(error.stack);
  }
}

init();
