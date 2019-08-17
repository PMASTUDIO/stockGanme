import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";

export default class App extends Component {
  state = {
    symbol: ""
  };

  _getData = async () => {
    const result = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
        this.state.symbol
      }&interval=5min&outputsize=full&apikey=7QZ8UBXHODHNCSD6`
    );
    const resJson = await result.json();
    return resJson[1];
  };

  handleData = async () => {
    const res = await this._getData();
    Alert.alert("Info", JSON.stringify(res));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={{ fontSize: 35, fontFamily: "monospace" }}>
            Ganme Stocks
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Company symbol"
          spellCheck={false}
          value={this.state.symbol}
          onChangeText={symbol => this.setState({ ...this.state, symbol })}
        />
        <Button
          onPress={this.handleData}
          title="Search"
          color="#841584"
          accessibilityLabel="Search your stocks from the symbal queried"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE"
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center"
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    fontSize: 17
  }
});
