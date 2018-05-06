import React, {Component} from 'react';
import LoginScreen from './LoginScreen.js';
import AccountScreen from '../AccountScreen/index.js';
import AddAccountScreen from '../AddAccountScreen/index.js';
import AddCategoryScreen from '../AddCategoryScreen/index.js';
import SideBar from '../SideBar/SideBar.js';
import {DrawerNavigator} from 'react-navigation';
import firebaseApp from '../Firebase';
import {NavigationActions} from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        AccountScreen: {screen: AccountScreen},
        AddAccountScreen: {screen: AddAccountScreen},
        AddCategoryScreen: {screen: AddCategoryScreen}
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
)
// export default HomeScreenRouter;

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        // this.addNewCategory = this.addNewCategory.bind(this);

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

//TODO incorrect
    componentWillUpdate() {

        alert('this.state.accounts.length = ' + this.state.accounts.length);

        if (this.state.accounts.length > 0) {
            console.log('selectedAcc = ' + this.state.selectedAcc);
            this.setState({
                selectedAcc: this.state.accounts[0].name,
                selectedCat: this.state.categoriesTransactions[0].name
            });

        }
    }

    setSelectedAcc = val => {
        this.setState({
            selectedAcc: val
        });
    }

    setSelectedCat = val => {
        this.setState({
            selectedCat: val
        });
    }

    setCurrentAccountId = index => {
        setState({
            currentAccountId: index
        });
    }

    addNewTransaction = (typeTrans, sum, description = '') => {

        let curAcc = this.state.accounts.filter(account => account.name === this.state.selectedAcc)[0];//OK

        let newTransaction = {
            id: Math.floor(Date.now() / 1000),
            accountId: curAcc.id,
            date: new Date(),
            type: typeTrans,
            name: this.state.selectedCat,
            sum: sum,
            description: description
        }

        firebaseApp.database().ref(this.state.userId).child('transactions')
            .push(newTransaction);

        this.setState({
            transactions: [newTransaction, ...this.state.transactions]
        });

    }

// addNewTransaction = (selectedAcc, selectedCat, typeTrans, sum, description='') => {
//
// let curAcc = this.state.accounts.filter(account => account.name === selectedAcc)[0];//OK
//
// let newTransaction = {
//   id: Math.floor(Date.now() / 1000),
//   accountId: curAcc.id,
//   date:  new Date(),
//   type: typeTrans,
//   name: selectedCat,
//   sum: sum,
//   description: description
// }
//
// firebaseApp.database().ref(this.state.userId).child('transactions')
// .push(newTransaction);
//
// this.setState({
//   transactions: [newTransaction, ...this.state.transactions]
// });
//
// }

    addNewAccount = name => {
        const newAcc = {
            id: Math.floor(Date.now() / 1000),
            name: name,
            sum: 0,
            transactions: new Array()//TODO
        }

        firebaseApp.database().ref(this.state.userId)
            .child('accounts').push(newAcc);

        this.setState({
            accounts: [newAcc, ...this.state.accounts]
        });

// let newAccounts = [...this.state.accounts];
//
// newAccounts.unshift(newAcc);
//
// firebaseApp.database().ref(this.state.userId)
// .child('accounts').set(newAccounts);
//
// this.setState({
//   accounts: newAccounts
// });

    }

    addNewCategory = name => {
        const newCat = {id: Math.floor(Date.now() / 1000), name: name}

        firebaseApp.database().ref(this.state.userId)
            .child('categoriesTransactions').push(newCat);

        this.setState({
            categoriesTransactions: [newCat, ...this.state.categoriesTransactions]
        });
    }

    test = () => {
        alert('This is the test class MyDrawer');
    }

    test2 = () => {
        alert('This is the test2 class MyDrawer');
    }

    async onRegister(email, password) {
// const {email, password} = this.state;

        try {
            await firebaseApp.auth()
                .createUserAndRetrieveDataWithEmailAndPassword(email, password)
                .then((response) => {
                    this.setState({
                        userId: response.user.uid,
                    })
                })

            await firebaseApp.database().ref(this.state.userId)
                .set({
                    email: email
                });

            // alert("Account created!");

            // Navigate to the Home page, the user is auto logged in
            // this.onLogin(this.state.email, this.state.password);bad

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
    }

    render() {

// alert('Length trans in MyDrawer = '+this.state.categoriesTransactions.toString());

        // alert('UserId in MyDrawer = '+this.state.userId);//

// alert('Render in Drawer');

// alert('selectedAcc = ' + this.state.selectedAcc);

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
                        // test: this.props.navigation.state.params.test,
                        test2: this.test2,
                        onRegister: this.onRegister,
                        onLogin: this.onLogin,
                        addNewCategory: this.addNewCategory,
                        addNewAccount: this.addNewAccount,
                        next: this.next,
                        setCurrentAccountId: this.setCurrentAccountId,
                        addNewTransaction: this.addNewTransaction,
                        // currentAccountId: this.state.currentAccountId,
                        // currentAccountName: this.state.currentAccountName,
                        selectedAcc: this.state.selectedAcc,
                        selectedCat: this.state.selectedCat,
                        setSelectedAcc: this.setSelectedAcc,
                        setSelectedCat: this.setSelectedCat
                    }
                }
            />
        );
    }
}
