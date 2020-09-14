import 'reflect-metadata';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from "express";
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import { IssueService } from './service/issuesService';
import TYPES from './constant/Types';
import './controller/issuesController';

admin.initializeApp();
cors({ origin: true } );

// load everything needed to the Container
const container = new Container();

container.bind<IssueService>(TYPES.IssueService).to(IssueService);

const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
};

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.options('*', cors())
    app.use(cors());
    app.use(validateFirebaseIdToken);
    app.use(bodyParser.json());
});

let serverInstance = server.build();
const main = express();
main.use('/api/v1', serverInstance);

export const webApi = functions.https.onRequest(main);