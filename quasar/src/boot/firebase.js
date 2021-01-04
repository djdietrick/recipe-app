import * as firebaseService from '../services/firebase.js';

export default async () => {
    // const config = process.env.environments.FIREBASE_CONFIG
    const config = {
        "apiKey": "AIzaSyDbhc3wdxJ_2BsAJvy3xxcmvRVIxWmYtX4",
        "authDomain": "dash-website-1b9cb.firebaseapp.com",
        "databaseURL": "https://dash-website-1b9cb.firebaseio.com",
        "projectId": "dash-website-1b9cb",
        "storageBucket": "dash-website-1b9cb.appspot.com",
        "messagingSenderId": "959681181393",
        "appId": "1:959681181393:web:9a0ebdf62c55ea1750f7f0"
    }
    firebaseService.init(config);
}