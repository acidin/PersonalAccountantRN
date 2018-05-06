import React, { Component } from "react";
import AllTransactions from "./AllTransactions.js";
import Expenses from "./Expenses.js";
import Incomes from "./Incomes.js";
import Fab from "../components/Fab.js";
import { TabNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";
import {
  // Fab,
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label,
  Container,
  View
} from "native-base";

// MainScreenNavigator = TabNavigator(
//   {
//     AllTransactions: { screen: AllTransactions },
//     Expenses: { screen: Expenses },
//     Incomes: { screen: Incomes }
//   },

//onPress={() => this.setState({ active: !this.state.active })}

const MainScreenNavigator = TabNavigator(
    {
      AllTransactions: { screen: props => <AllTransactions {...props}/> },
      Expenses: { screen: props => <Expenses {...props} /> },
      Incomes: { screen: props => <Incomes {...props} /> }
    },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
return (

<Footer style = {{position: 'absolute', left: 0, right: 0,bottom: 0}}>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("AllTransactions")}
            >
              <Icon name="bowtie" />
              <Text>All</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Expenses")}
            >
              <Icon name="briefcase" />
              <Text>Expenses</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Incomes")}
            >
              <Icon name="headset" />
              <Text>Incomes</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  },
);

export default class MyTab extends Component {
  constructor(props) {
    super(props);

    // this.test = this.test.bind(this);
    // this.onRegister = this.onRegister.bind(this);

    this.state = {
        userId:'',
        accounts:[],
        transactions:[],
        categoryTransactions:[]
    }
  }

test1=()=>{
  alert('This is the test class MyTab');
}

testSetState=()=>{
  this.setState({
    userId: "qqq"
  });
}

  render() {

// alert('render index MyTab');

    return (

      <MainScreenNavigator
      screenProps={
      {
        // userId: this.props.navigation.state.params.userId,
        userId: this.props.screenProps.userId,//OK
        navigation: this.props.navigation,
        categoriesTransactions: this.props.screenProps.categoriesTransactions,
        transactions: this.props.screenProps.transactions,
        accounts: this.props.screenProps.accounts,
         // test: this.props.navigation.state.params.test,
        test1: this.test1,
         test: this.props.screenProps.test2,
         addNewTransaction: this.props.screenProps.addNewTransaction,
         testSetState: this.testSetState,
         selectedAcc: this.state.selectedAcc,
         selectedCat: this.state.selectedCat,
         setSelectedAcc: this.props.screenProps.setSelectedAcc,
         setSelectedCat: this.props.screenProps.setSelectedCat
      }
    }
    />
  );
  }
}
