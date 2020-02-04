import FirebaseContext, { withFirebase } from './withFirebase';
import interactions from '../use-cases';

// by pass use-cases layer
import Firebase from "../data-access";
let authListner = Firebase.authListner

export default {
    ...interactions,
    authListner,
}
export { FirebaseContext, withFirebase };