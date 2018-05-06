import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Form,
  Item,
  Input,
  View
} from "native-base";
import { NavigationActions } from "react-navigation";
import firebaseApp from '../fb-config';
import Category from '../components/Category';

// firebaseApp.database().ref('users').child(response.user.uid).set({
//       email: this.state.email
//     });

export default class AddCategoryScreen extends Component {

  constructor () {
    super();
    // this.onLogin = this.onLogin.bind(this);
    // this.onRegister = this.onRegister.bind(this);

    this.state = {
          name:''
    }
  }

// componentDidMount(){
//
//   while(!this.props.screenProps.categoriesTransactions.length)
//   this.setState({
//     name:''
//   });
// }

nameTextHandler = val => {
    this.setState({
      name: val
    })
}

addCategoryHandler=()=>{
  if(this.state.name.length>0)
  this.props.screenProps.addNewCategory(this.state.name);
}

render() {

alert('render AddCategoryScreen');

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Add new category</Title>
          </Body>
        </Header>
<Content>
<Form>
<Item last>
<Input placeholder="Input new category"
onChangeText={this.nameTextHandler}
value={this.state.name}
/>
</Item>
<View style={styles.container}>
  <Button
    onPress={this.addCategoryHandler}>
    <Text>Create new category</Text>
  </Button>
</View>
</Form>

<Text>
Count of categories = {
  this.props.screenProps.categoriesTransactions.length
  ? this.props.screenProps.categoriesTransactions.length
  : 0
}
</Text>

<Text>
UserId =
{this.props.screenProps.userId}
</Text>

<ScrollView>
    {
        this.props.screenProps.categoriesTransactions.map(category =>

<Category

category={category}
key={category.id}
/>
      )
    }
</ScrollView>


</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 72,
    borderWidth: 0.5,
    borderColor: 'lightgray'
  }
})
