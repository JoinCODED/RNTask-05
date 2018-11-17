import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

// NativeBase Components
import {
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Content,
  Container,
  Footer,
  Button,
  FooterTab
} from "native-base";

// Style
import styles from "./styles";

// Utils
import { quantityCounter } from "../../utilities/quantityCounter";

// Components
import PrivateNavigation from "../PrivateNavigation";
import CoffeeFooter from "../CoffeeFooter";

class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
    headerRight: <PrivateNavigation route="CoffeeCart" />
  });

  componenDidMount() {
    this.props.navigation.setParams({ quantity: this.props.quantity });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity != this.props.quantity) {
      this.props.navigation.setParams({ quantity: this.props.quantity });
    }
  }

  handlePress(shop) {
    this.props.navigation.navigate("CoffeeDetail", {
      shop: shop,
      quantity: this.props.quantity
    });
  }

  renderItem(shop) {
    return (
      <TouchableOpacity key={shop.id} onPress={() => this.handlePress(shop)}>
        <ImageBackground
          source={{ uri: shop.background }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: shop.img }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{shop.name}</Text>
                  <Text note style={styles.text}>
                    {shop.distance}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  render() {
    const { coffeeshops } = this.props.coffee;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(shop => this.renderItem(shop));
    }
    return (
      <Container style={styles.container}>
        <Content>
          <List>{ListItems}</List>
        </Content>
        <CoffeeFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  coffee: state.coffee,
  quantity: quantityCounter(state.cart.list)
});

export default connect(
  mapStateToProps,
  {}
)(CoffeeList);
