import React from "react";
import {AppRegistry, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {NavigationActions} from "react-navigation";
import Fab from "../components/Fab.js";
import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Input,
    InputGroup,
    Item,
    Tab,
    Tabs,
    Footer,
    FooterTab,
    Label,
    Form
} from "native-base";

import PickerAccounts from '../components/PickerAccounts';
import PickerCategories from '../components/PickerCategories';
import Transaction from '../components/Transaction';

export default class AllTransactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // selectedAcc:'',//первое значение из массива accounts[0].name
            // selectedCat:'',//первое значение из массива categoriesTransactions[0].name
            income: false,
            expense: false,
            typeTransaction: null,
            description: '',
            sum: 0
        }
    }

// componentDidMount(){
//
// if(this.props.screenProps.accounts.length>0)
// this.setState({
//   selectedAcc: this.props.screenProps.accounts[0].name,
//   selectedCat: this.props.screenProps.categoriesTransactions[0].name
// });
// }

    setTypeTransaction = type => {
        this.setState({
            typeTransaction: type
        });
    }

// expense=()=>{
//   this.setState({
//     expense: !this.state.expense
//   });
// }

    descriptionTextHandler = val => {
        this.setState({
            description: val
        })
    }

    sumTextHandler = val => {
        this.setState({
            sum: val
        })
    }

// setSelectedAcc=val=>{
//   this.setState({
//     selectedAcc: val
//   });
// }
//
// setSelectedCat=val=>{
//   this.setState({
//     selectedCat: val
//   });
// }

// onTransactionHandler = () =>{
//
// this.setTypeTransaction(null);
//
// // alert('this.props.screenProps.selectedAcc = ' + this.props.screenProps.selectedAcc); undefined
//
// this.props.screenProps.addNewTransaction(
// this.props.screenProps.selectedAcc, this.props.screenProps.selectedCat,
// this.state.typeTransaction, this.state.sum, this.state.description)
// }

    onTransactionHandler = () => {

        this.setTypeTransaction(null);

// alert('this.props.screenProps.selectedAcc = ' + this.props.screenProps.selectedAcc); undefined

        this.props.screenProps.addNewTransaction(
            this.state.typeTransaction, this.state.sum, this.state.description)
    }

    render() {

// alert('render of AllTransactions');

        if (this.state.typeTransaction === null)
            return (
                <Container>
                    <Header>
                        {!this.props.screenProps.accounts && <ActivityIndicator size="small" color="#00ff00" />}
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.screenProps.navigation.navigate("DrawerOpen")}
                            >
                                <Icon name="menu"/>
                            </Button>
                        </Left>
                        <Body>
                        <PickerAccounts
                            accounts={this.props.screenProps.accounts}
                            selectedAcc={this.props.screenProps.selectedAcc}
                            setSelectedAcc={this.props.screenProps.setSelectedAcc}
                        />
                        </Body>
                    </Header>


                    <Text>userId = {this.props.screenProps.userId}</Text>
                    <Text>
                        categoriesTransactions length = {this.props.screenProps.categoriesTransactions.length}
                    </Text>
                    <Text>
                        accounts length = {this.props.screenProps.accounts.length}
                    </Text>
                    <Text>
                        Transactions length = {this.props.screenProps.transactions.length}
                    </Text>

                    <ScrollView>
                        {
                            this.props.screenProps.transactions.map(transaction =>
                                <Transaction
                                    transaction={transaction}
                                    key={transaction.id}
                                />
                            )
                        }
                    </ScrollView>

                    <Fab
                        navigation={this.props.screenProps.navigation}
                        test={this.props.screenProps.test}
                        test1={this.props.screenProps.test1}
                        expense={this.expense}
                        testSetState={this.props.screenProps.testSetState}
                        setTypeTransaction={this.setTypeTransaction}
                        typeTransaction={this.state.typeTransaction}
                    />

                </Container>

            );

// Expense or Income
        return (
            <Container>
                <Header>
                    <Title>New {`${this.state.typeTransaction}`} transaction</Title>
                </Header>
                <Content>

                    <Form>
                        <Item>
                            <Input
                                placeholder="Description"
                                // autoFocus={true}
                                onChangeText={this.descriptionTextHandler}
                                value={this.state.description}
                            />
                        </Item>
                        <Item last>
                            <Input placeholder="Sum"
                                   onChangeText={this.sumTextHandler}
                                   value={`${this.state.sum}`}
                            />
                        </Item>

                        <View style={styles.container}>
                            <Button
                                onPress={this.onTransactionHandler}>
                                <Text>Add transaction</Text>
                            </Button>
                        </View>

                        <PickerCategories
                            categoriesTransactions={this.props.screenProps.categoriesTransactions}
                            selectedCat={this.props.screenProps.selectedCat}
                            setSelectedCat={this.props.screenProps.setSelectedCat}
                        />

                    </Form>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        // backgroundColor: 'green',
        // width: 50,
        // height: 50,
        // borderRadius: 50,
        // borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
        // marginBottom: 96,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 28
    },
    containerInput: {
        paddingLeft: '8%',
        width: '92%',
        paddingTop: 40
    },
    containerText: {
        paddingTop: 50
    },
    textCenter: {
        fontSize: 16,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        // justifyContent: 'space-between',
        justifyContent: 'center',
        // alignSelf:'center',
        flexDirection: 'row',
        height: 72,
        borderWidth: 0.5,
        borderColor: 'lightgray'
    }
})
