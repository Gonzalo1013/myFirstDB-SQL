// Base de datos con SQL y Knex
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'myfirstdb'
    },
    pool: { min: 2 , max: 8 }
})

knex.schema.createTableIfNotExists('products', (table) => {
    table.increments('id').primary();
    table.string('title')
    // table.string('description')
    table.string('price') //ojo aca con el integer 
    // table.string('stock')
    table.string('thumbnail')
})
.then(()=>{
    console.log("created table products knex");
})
.catch((err) => {
    throw err;
})


// Base de datos con SQL y sqlite3
const knexSQLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './db/message.sqlite'
    },
    useNullAsDefault: true,
})

knexSQLite.schema.createTableIfNotExists('message', (table) => {
    table.string('user');
    table.string('time').primary();
    table.string('message');
})
.then(()=>{
    console.log("created table sqlite");
})
.catch((err) => {
    throw err;
})


module.exports = { knex , knexSQLite };