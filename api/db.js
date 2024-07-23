//for mysql connection
// we can create connection  in index.js also

import mysql from "mysql2"

export const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lamadev123",
    database: "blog"
})