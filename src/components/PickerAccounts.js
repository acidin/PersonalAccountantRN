import React, { Component } from 'react';
import { Picker } from "react-native";
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
  View
} from "native-base";

export default class PickerAccounts extends Component {

loadAccounts=()=> {

  return this.props.accounts.map(account => (
     <Picker.Item
      label={account.name + ', sum = ' + account.sum}
       value={account.name}
       key={account.id}
        />
  ))
}

getAlert=(itemIndex)=>{
  alert(itemIndex);
}

// onSetSelectedAcc=itemValue=>{
// this.props.setSelectedAcc(itemValue);
// }

  render() {
    return (
      <Container>
    <View>

    <Picker
      selectedValue={this.props.selectedAcc}//
      style={{ height: 50, width: 250 }}
      onValueChange={(itemValue, itemIndex) =>
      // this.getAlert(itemValue)}
      // this.onSetSelectedAcc(itemValue) }

      this.props.setSelectedAcc(itemValue)}
        // this.setState({selectedAcc: itemValue})}
        >

      {this.loadAccounts()}

    </Picker>

    </View>
      </Container>
    );
  }
}
