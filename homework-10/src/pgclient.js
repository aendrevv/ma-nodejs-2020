const { Client } = require('pg');

const client = new Client({
    user: 'justAnotherUser',
    host: 'localhost',
    port: 54321,
    database: 'justAnotherDB',
    password: 'p455w0rd',
});

module.exports = { client };
