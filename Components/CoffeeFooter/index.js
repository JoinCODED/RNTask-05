import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Text, Footer, Button, FooterTab } from "native-base";

// Style
import styles from "./styles";

// Actions
import { logoutUser } from "../../store/actions/authActions";

class CoffeeFooter extends Component {
  loginButton() {
    return (
      <Button
        transparent
        full
        onPress={() => this.props.navigation.navigate("Login")}
      >
        <Text style={styles.text}>Login</Text>
      </Button>
    );
  }
  logoutButton() {
    return (
      <Button
        transparent
        full
        onPress={() => this.props.logoutUser(this.props.navigation)}
      >
        <Text style={styles.text}>Logout</Text>
      </Button>
    );
  }
  render() {
    return (
      <Footer style={styles.transparent}>
        <FooterTab>
          {this.props.auth.isAuthenticated
            ? this.logoutButton()
            : this.loginButton()}
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapActionsToProps = dispatch => ({
  logoutUser: navigation => dispatch(logoutUser(navigation))
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(CoffeeFooter)
);
