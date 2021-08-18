import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { FIREBASE_TEXT_ID, setTextVal } from "../utils";
import { Logout } from "../store/ActionCreators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const TextField = () => {
  const [text, setText] = useState("Hello");
  const [inputText, setInputText] = useState(null);
  const doc = firestore().collection("Text").doc(FIREBASE_TEXT_ID);
  const dispatch = useDispatch();
  const logout = (status) => dispatch(Logout(status));

  const deleteUser = async () => {
    console.log("Inside Delete User");
    try {
      await AsyncStorage.removeItem("uid");
      await AsyncStorage.removeItem("email");
    } catch (e) {
      // saving error
      console.log("Error", e);
    }
  };

  useEffect(() => {
    const subscriber = doc.onSnapshot((documentSnapshot) => {
      console.log("User data: ", documentSnapshot.data());
      setText(documentSnapshot.data().Text);
    });
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.displayText}>{text}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"gray"}
          placeholder={text}
          onChangeText={(val) => setInputText(val)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTextVal(inputText)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logout(false);
            deleteUser();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: Dimensions.get("screen").width * 0.4,
    backgroundColor: "cyan",
    height: Dimensions.get("screen").height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
  textInput: {
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "#fffff2",
    padding: 10,
    paddingHorizontal: 20,
    height: Dimensions.get("screen").height * 0.08,
    borderRadius: 14,
    fontSize: 18,
    color: "black",
  },
  container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    backgroundColor:'#222'
  },
  inputContainer: { flex: 1, justifyContent: "flex-start" },
  displayText: { fontWeight: "bold", fontSize: 32,color:'#fff' },
});
