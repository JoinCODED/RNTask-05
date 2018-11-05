import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard } from "react-native";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";

// Actions
import { loginUser, registerUser } from "../../store/actions/authActions";
import { setCurrentUser } from "../../store/actions/authActions";

// deviceStorage
import deviceStorage from "../../utilities/deviceStorage";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "Login"
  };

  componentDidMount() {
    deviceStorage.getToken().then(value => this.handleToken(value));
  }

  handleLogin() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    this.props.loginUser(
      {
        username: username,
        password: password
      },
      navigation
    );
    Keyboard.dismiss();
  }

  handleRegister() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    this.props.registerUser(
      {
        username: username,
        password: password
      },
      navigation
    );
    Keyboard.dismiss();
  }

  handleToken(token) {
    if (token) {
      const decoded = jwt_decode(token);
      this.props.setCurrentUser(decoded);
      this.props.navigation.navigate("CoffeeList");
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={username => this.setState({ username })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button full success onPress={() => this.handleLogin()}>
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={() => this.handleRegister()}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }}>
            {this.props.auth.error}
          </Label>
        </Body>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapActionsToProps = dispatch => ({
  loginUser: (userData, navigation) =>
    dispatch(loginUser(userData, navigation)),
  registerUser: (userData, navigation) =>
    dispatch(registerUser(userData, navigation)),
  setCurrentUser: token => dispatch(setCurrentUser(token))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
