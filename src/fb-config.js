import firebase from 'firebase';
import * as configFirebase from './config';

const config = {
    apiKey: configFirebase.API_KEY,
    authDomain: configFirebase.AUTH_DOMAIN,
    databaseURL: configFirebase.DATABASE_URL,
    storageBucket: configFirebase.STORAGE_BUCKET
}
firebase.initializeApp(config);
