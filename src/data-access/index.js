import makeFirebase from './firebase.js';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyAwiovUCLsjWXMcTdb-3t6cT93rarJogp0",
	authDomain: "first-firebase-learning.firebaseapp.com",
	databaseURL: "https://first-firebase-learning.firebaseio.com",
	projectId: "first-firebase-learning",
	storageBucket: "first-firebase-learning.appspot.com",
	messagingSenderId: "643311198085",
	appId: "1:643311198085:web:850c484c5bd83a384daeec",
	measurementId: "G-S624QJKCZC"
};

class fb {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.firestore = app.firestore()
        this.auth = app.auth()
    }
    getEmployee = () => this.firestore.collection("employee")
    getApp = () => app
    getRfid = () => this.firestore.collection('temp_rfid')
    getAuth = () => this.auth
}

function makeDb(Interface) {
    return {
        app: Interface.getApp(),
        employee: Interface.getEmployee("first-firebase-learning"),
        auth: Interface.getAuth(),
        rfid: Interface.getRfid()
    }
}

const Firebase = makeFirebase({...makeDb(new fb())})
export default Firebase