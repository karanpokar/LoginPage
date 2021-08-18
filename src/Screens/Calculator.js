import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
const HEIGHT = Dimensions.get("screen").height;
import functions from "@react-native-firebase/functions";
const WIDTH = Dimensions.get("screen").width;

const Calculator = () => {
  let val = ["1", "2", "3", "-", "4", "5", "6", "*", "7", "8", "9", "0"];
  const [string, setString] = useState("");
  console.log("String", string);
  const getVal = async () => {
    await functions()
      .httpsCallable("evaluateMath")(string)
      .then((response) => {
        console.log("Response", JSON.stringify(response, null, 2));
        setString(response.data);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setString(string + item)}
      style={{
        ...styles.button,
        backgroundColor: item == "*" || item == "-" ? "#eb0029" : "#43A6C6",
        elevation: 3,
        marginBottom: 5,
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: item == "*" || item == "-" ? "white" : "black",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#222" }}>
      <View
        style={styles.container}
      >
        <Text
          style={{
            fontSize: 38,
            fontWeight: "bold",
            alignSelf: "flex-end",
            color: "white",
          }}
        >
          {string}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => setString("")}
          style={{ ...styles.button, backgroundColor: "#eb0029" }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setString(string + "+")}
          style={{ ...styles.button, backgroundColor: "#eb0029" }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setString(string + "/")}
          style={{ ...styles.button, backgroundColor: "#eb0029" }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getVal()}
          style={{ ...styles.button, backgroundColor: "#eb0029" }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>=</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={val}
        scrollEnabled={false}
        style={{ alignSelf: "center" }}
        numColumns={4}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("screen").width * 0.22,
    height: Dimensions.get("screen").height * 0.12,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    backgroundColor: "#43A6C6",
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  container:{
    marginVertical: HEIGHT * 0.03,
    height: HEIGHT * 0.2,
    backgroundColor: "#444444",
    borderRadius: 10,
    width: WIDTH * 0.92,
    alignSelf: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  buttonText: { fontSize: 28, fontWeight: "bold" },
});
