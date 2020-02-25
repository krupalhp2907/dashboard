import makeFirebase from './firebase.js';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
  // Enter your firebase credentials
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
