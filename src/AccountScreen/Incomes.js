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

export default class Incomes extends Component {
  render() {

    // alert('render of Incomes');

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
            <Title>Incomes</Title>
          </Body>
        </Header>



        <ScrollView>
            {
                this.props.screenProps.transactions
                .filter(transaction=>transaction.type==='income')
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
