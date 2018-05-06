import {action, observable, computed, configure} from 'mobx';
import firebase from 'firebase';
// configure({ enforceActions: true });

export class AuthStore {
    @observable uid = '';
    @observable displayName = '';

    @observable email = 'q2@test.net';
    @observable password = 'qwerty';
    @observable user = null;

    @action setEmail = email => this.email = email;
    @action setPassword = password => this.password = password;

    @computed get isLoggedin() {
        return !!this.user;
    }

    @action setUser = user => {
        this.uid = user.uid;
        this.displayName = user.displayName;
    };

    constructor() {
        firebase.auth().onAuthStateChanged(action(user => this.user = user))
    }

    signIn = () => firebase.auth().signInWithEmailAndPassword(this.email, this.password)

    doLogin = (email, password) => {
        firebase.auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(response => {
                this.setUser(response.user)
            });
    };

    doLogout() {
        firebase.auth().signOut()
    }

    refLogin() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.clearUserInfo();
                return;
            }
            this.setUserInfo(user);
        });
    }

    setUserInfo = user => {
        this.uid = user.uid;
        this.displayName = user.displayName;
    }

    clearUserInfo() {
        this.uid = '';
        this.displayName = '';
    }
}

export default AuthStore