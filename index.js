import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import bodyParser from 'body-parser';
import database from './server/config/database';
import routes from './server/routes';
import http from 'http';
import Pusher from 'pusher';

const port = process.env.PORT || 3000;
let pusher = new Pusher({
    appId: '391042',
    key: '1dbaf5cd35a87b7793b5',
    secret: 'fe29da3f2bcfe8f9aa22',
    cluster: 'eu',
    encrypted: true
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const db = database();
routes(app, pusher);


const webServer = http.createServer(app).listen(port, ()=>{
    console.log('Server running');
});
