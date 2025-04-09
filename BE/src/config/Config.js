import bodyParser from 'body-parser';
import express from 'express';

const config = (app)=>{
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.static("public"))
}

export default config;