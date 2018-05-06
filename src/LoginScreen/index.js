import React, {Component} from 'react';
import LoginScreen from './LoginScreen.js';
import AccountScreen from '../AccountScreen/index.js';
import AddAccountScreen from '../AddAccountScreen/index.js';
import AddCategoryScreen from '../AddCategoryScreen/index.js';
import {DrawerNavigator} from 'react-navigation';
import firebaseApp from '../Firebase';
import {NavigationActions} from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        AccountScreen: {screen: AccountScreen},
        AddAccountScreen: {screen: AddAccountScreen},
        AddCategoryScreen: {screen: AddCategoryScreen}
    }
)

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);

        this.state = {
            authentication: false,
            userId: '',
            accounts: [],
            transactions: [],
            categoriesTransactions: [],
            currentAccountId: 0,//hz
            currentAccountName: '',//hz
            selectedAcc: null,
            selectedCat: null,

        }
    }

    async onRegister(email, password) {
        try {
            await firebaseApp.auth()
                .createUserAndRetrieveDataWithEmailAndPassword(email, password)
                .then((response) => {
                    this.setState({
                        userId: response.user.uid,
                    })
                });

            await firebaseApp.database().ref(this.state.userId)
                .set({
                    email: email
                });

        } catch (error) {
            alert(error.toString())
        }
    }

    async onLogin(email, password) {

        let getCategoriesTransactions = [], accounts = [], transactions = [], selectedAcc, selectedCat;

        try {

            await firebaseApp.auth()
                .signInAndRetrieveDataWithEmailAndPassword(email, password)
                .then((response) => {

                    firebaseApp.database().ref(response.user.uid)
                        .child('categoriesTransactions')
                        .on("value", function (snapshot) {
                            snapshot.forEach(function (childSnapshot) {
                                const childData = childSnapshot.val();
                                const id = childData.id;
                                getCategoriesTransactions.push(childData);
                            });
                        });

                    firebaseApp.database().ref(response.user.uid)
                        .child('transactions')
                        .on("value", function (snapshot) {
                            snapshot.forEach(function (childSnapshot) {
                                const childData = childSnapshot.val();
                                const id = childData.id;
                                transactions.push(childData);
                            });
                        });

                    firebaseApp.database().ref(response.user.uid)
                        .child('accounts')
                        .on("value", function (snapshot) {
                            snapshot.forEach(function (childSnapshot) {
                                const childData = childSnapshot.val();
                                const id = childData.id;
                                accounts.push(childData);
                            });
                        });

                    selectedAcc = accounts.length > 0 ? accounts[0] : null;
                    selectedCat = getCategoriesTransactions.length > 0
                        ? getCategoriesTransactions[0]
                        : null;

                    this.setState({
                        userId: response.user.uid,
                        categoriesTransactions: getCategoriesTransactions,
                        accounts: accounts,
                        transactions: transactions,
                        authentication: true,
                        selectedAcc: selectedAcc,
                        selectedCat: selectedCat
                    })
                })
        } catch (error) {
            alert(error.toString())
        }
    }

    next = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'HomeScreenRouter',
            action: NavigationActions.navigate({
                routeName: 'AccountScreen',
                params: {notificationId: '355'},
            }),
        });

        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        return (
            <HomeScreenRouter
                screenProps={
                    {
                        userId: this.state.userId,
                        authentication: this.state.selectedAcc,
                        navigation: this.props.navigation,
                        categoriesTransactions: this.state.categoriesTransactions,
                        transactions: this.state.transactions,
                        accounts: this.state.accounts,
                        onRegister: this.onRegister,
                        onLogin: this.onLogin,
                        next: this.next,
                    }
                }
            />
        );
    }
}
