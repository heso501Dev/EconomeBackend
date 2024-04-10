const {Surreal} = require('surrealdb.node');

const db = new Surreal();



// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "econo",
//     password: "test",
//     port: 5432,
//   });


module.exports = db;
