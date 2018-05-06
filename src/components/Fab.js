import React, { Component } from 'react';
import { Container, View, Button, Icon, Fab } from 'native-base';
import firebaseApp from '../Firebase';

// onPress={() => this.props.navigation.navigate("Expenses")}

export default class FAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleTest = () => {
      this.props.test();
  }

  handleNavigate=()=>{
    this.props.navigation.navigate("Expenses");
  }

  handleTest1 = () => {
      this.props.test1();
  }

handleExpense=()=>{
  // this.props.expense();
  this.props.setTypeTransaction('expense');
}

handleIncome=()=>{
  this.props.setTypeTransaction('income');
}

  render() {
    return (


      <View>
          <Fab
            active={this.state.active}
            direction="up"
            // containerStyle={{ }}
            style={{ backgroundColor: '#5067FF', marginBottom: 50 }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />

   <Button style={{ backgroundColor: '#34A34F', marginBottom: 50 }}
              onPress={this.props.test}
            >
              <Icon name="logo-whatsapp" />
            </Button>

            <Button style={{ backgroundColor: '#3B5998', marginBottom: 50 }}
            onPress={this.handleIncome}

            >
              <Icon name="navigate"
              style={{color: 'green', transform: [{ rotate: '180deg' }]}}
              />
            </Button>

            <Button style={{ backgroundColor: '#DD5144', marginBottom: 50 }}
            onPress={this.handleExpense}
            >
              <Icon name="navigate"
              style={{color: 'red'}}
               />
            </Button>

          </Fab>
        </View>

    );
  }
}
