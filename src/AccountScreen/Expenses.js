import React, {Component} from "react";
import { AppRegistry, View, StatusBar, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
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
  Label
} from "native-base";

import Transaction from '../components/Transaction';

export default class Expenses extends Component {

componentDidMount(){
      // alert('componentDidMount of Expenses');
}


  render() {

    // alert('render of Expenses');

    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.screenProps.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Expenses</Title>
          </Body>

        </Header>
        <ScrollView>
            {
                this.props.screenProps.transactions
                .filter(transaction=>transaction.type==='expense')
                .map(transaction =>
                    <Transaction
                        transaction={transaction}
                        key={transaction.id}
                      />
                    )
            }
        </ScrollView>
      </Container>
    );
  }
}
