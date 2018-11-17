import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Actions
import { getCoffeeShops } from "../../store/actions/coffeeActions";
import { setCurrentUser } from "../../store/actions/authActions";

// Navigation
import Nav from "../Navigation";

// deviceStorage
import deviceStorage from "../../utilities/deviceStorage";
import jwt_decode from "jwt-decode";

class HomePage extends Component {
  componentDidMount() {
    const { coffeeshops } = this.props.coffee;
    if (!coffeeshops) this.props.getCoffeeShops();
    deviceStorage.getToken().then(token => {
      if (token) {
        const decoded = jwt_decode(token);
        this.props.setCurrentUser(decoded);
      }
    });
  }

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  coffee: state.coffee
});

const mapActionsToProps = dispatch => ({
  getCoffeeShops: () => dispatch(getCoffeeShops()),
  setCurrentUser: token => dispatch(setCurrentUser(token))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
