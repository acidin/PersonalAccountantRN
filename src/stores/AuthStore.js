import {action, observable, computed} from 'mobx';
import firebase from 'firebase';

export class AuthStore  {
    @observable uid = null;
    @observable displayName = '';

    @observable email = 'q2@test.net';
    @observable password = 'qwerty';
    @observable user = null;

    @action setEmail = email => this.email = email;
    @action setPassword = password => this.password = password;

    @computed get isLoggedin() {
        return !!this.uid;
    }

    @action setUser = user => {
        this.user = user;
        this.uid = user.uid;
        this.displayName = user.displayName;
    };

    doLogin(email, password) {
        firebase.auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(response => {
                this.setUser(response.user)
            });
    };

    // doLogout() {
    //     firebase.auth().signOut()
    // }
    //
    // refLogin() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (!user) {
    //             this.clearUserInfo();
    //             return;
    //         }
    //         this.setUserInfo(user);
    //     });
    // }
    //
    // clearUserInfo() {
    //     this.uid = '';
    //     this.displayName = '';
    // }
}

export default AuthStore