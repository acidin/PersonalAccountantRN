import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Account extends Component {

    // handleDelete = () => {
    //     this.props.delProduct(this.props.product.id);
    // }

    render() {
        return (
          <Text style={{color: 'yellow'}}>
          {
            this.props.account.name + ', sum = '+this.props.account.sum
          }
          </Text>
        )
    }
}
