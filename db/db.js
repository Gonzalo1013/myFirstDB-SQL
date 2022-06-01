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
    table.string('description')
    table.integer('price') //ojo aca con el integer 
    table.integer('stock')
    table.string('thumbnail')
})
.then(()=>{
    console.log("created table");
})
.catch((err) => {
    throw err;
})


// Base de datos con SQL y sqlite3
const knexSqlite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './db/mensajes.sqlite',
    },
    useNullAsDefault: true,
})

knexSqlite.schema.createTableIfNotExists('mensajes', (table) => {
    table.string('user');
    table.string('time').primary();
    table.string('message');
})
.then(()=>{
    console.log("created table");
})
.catch((err) => {
    throw err;
})


module.exports = { knex , knexSqlite };