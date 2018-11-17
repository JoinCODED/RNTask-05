import React from "react";
import { connect } from "react-redux";
// Navigation
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Text, Button, Icon } from "native-base";

class PrivateNavigation extends React.Component {
  navigate() {
    let route = this.props.route;
    if (!this.props.auth.isAuthenticated) {
      route = "Login";
    }
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <Button light transparent onPress={() => this.navigate()}>
        <Text>
          {this.props.navigation.getParam("quantity", 0)}{" "}
          <Icon
            type="FontAwesome"
            name="coffee"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withNavigation(
  connect(
    mapStateToProps,
    {}
  )(PrivateNavigation)
);
