import React, {Component} from "react";
import {StatusBar, StyleSheet} from "react-native";
import {NavigationActions} from "react-navigation";
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
import {login, reg, exit, next} from '../constants';
import {observer, inject} from 'mobx-react'
import firebaseApp from "../fb-config";
import {AuthStore} from "../stores/AuthStore";

@inject('AuthStore') @observer
export default class LoginScreen extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         authentication: false,//don't use
    //         email: 'q2@test.net',
    //         password: 'qwerty'
    //     }
    // }

    componentDidMount() {
        // const {email, password} = this.state;
        //
        // firebaseApp.auth()
        //     .signInAndRetrieveDataWithEmailAndPassword(email, password)
        //     .then(response => {
        //         this.props.AuthStore.setUsers(response.user)
        //     });
    }

    exit = () => {

    };

    onLoginHandler = () => {
        console.log(this.props);
        console.log(this.props.AuthStore);

        this.props.AuthStore.signIn();

        // this.setState({
        //     authentication: this.props.AuthStore.isLoggedin
        // });
    };

    onRegisterHandler = () => {
        // this.props.screenProps.onRegister(this.state.email, this.state.password);
        this.onLoginHandler();
    };

    getContent = () => {
        const {AuthStore} = this.props;

        if (!this.props.AuthStore.isLoggedin)
            return (
                <Form>
                    <Item>
                        <Input
                            placeholder="Email"
                            autoFocus={true}
                            onChangeText={AuthStore.setEmail}
                            value={AuthStore.email}
                        />
                    </Item>
                    <Item last>
                        <Input placeholder="Password"
                               onChangeText={AuthStore.setPassword}
                               value={AuthStore.password}
                        />
                    </Item>
                    <View style={styles.container}>
                        <Button
                            onPress={this.onLoginHandler}>
                            <Text>{login}</Text>
                        </Button>
                        <Button
                            onPress={this.onRegisterHandler}>
                            <Text>{reg}</Text>
                        </Button>
                    </View>
                </Form>
            );

        return (
            <Form>
                <Item last>
                    <Input value={AuthStore.email}/>
                </Item>
                <View style={styles.container}>
                    <Button
                        onPress={this.exit}>
                        <Text>{exit}</Text>
                    </Button>
                </View>
            </Form>
        );
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>
                        Login Screen
                    </Title>
                    </Body>
                </Header>
                <Content>
                    {this.getContent()}
                    <Text>
                        user via MOBX = {this.props.AuthStore.user}
                    </Text>
                    <Text>
                        categoriesTransactions length = {this.props.screenProps.categoriesTransactions.length}
                    </Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 72,
        borderWidth: 0.5,
        borderColor: 'lightgray'
    }
});
