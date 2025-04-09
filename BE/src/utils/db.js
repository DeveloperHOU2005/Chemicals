import pg from 'pg';

import env from 'dotenv'

env.config()

const db = new pg.Client(({
    host: process.env.HOST,
    database: process.env.DATABASE, 
    password: process.env.PASSWORD,
    port: process.env.PORTS, 
    user: process.env.USER
}));

db.connect();


export default db;