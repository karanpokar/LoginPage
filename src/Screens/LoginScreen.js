import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  alert,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect, useDispatch, useSelector } from "react-redux";
import { Login } from "../store/ActionCreators";
import auth from "@react-native-firebase/auth";
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

//

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const [passInput, setPassInput] = useState(false);
  const [type, setType] = useState("Register");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const login = (user, token) => dispatch(Login(user, token));

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  function StrengthChecker(PasswordParameter) {
    if (strongPassword.test(PasswordParameter)) {
      setPasswordError("Strong");
    } else if (mediumPassword.test(PasswordParameter)) {
      setPasswordError("Medium");
    } else {
      setPasswordError("Weak");
    }
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setDisabled(false);
      setEmailError("");
      return true;
    }
    setEmailError("Please Enter Valid Email");
    setDisabled(true);
    return false;
  }

  const SignUp = () => {
    setLoading(true);
    console.log("Inside SignUp");

    auth()
      .createUserWithEmailAndPassword(name, pass)
      .then((data) => {
        setLoading(false);
        console.log("User account created & signed in!", data);
        login(data, data.user.uid);
        const setUID = async (data) => {
          await AsyncStorage.setItem("uid", data.user.uid);
          await AsyncStorage.setItem("email", name);
        };
        setUID(data);
        const setEmail = async (name) => {
          //await AsyncStorage.setItem('uid', data.user.uid);
          await AsyncStorage.setItem("email", name);
        };
        setEmail(name);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }
        setLoading(false);
        
        Alert.alert('Already in Use or Invalid');
      });
  };

  const SignIn = () => {
    setLoading(true);
    console.log("Inside SignIn");
    auth()
      .signInWithEmailAndPassword(name, pass)
      .then((data) => {
        console.log("User account created & signed in!", data);
        login(data, data.user.uid);
        setLoading(false);
        const setUID = async (data) => {
          await AsyncStorage.setItem("uid", data.user.uid);
        };
        setUID(data);
        const setEmail = async (name) => {
          //await AsyncStorage.setItem('uid', data.user.uid);
          await AsyncStorage.setItem("email", name);
        };
        setEmail(name);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }
        Alert.alert("Error while signIn, Email Address or Password is incorrect");
      });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.subContainer}>
        <View style={{ flex: 0.1, marginBottom: HEIGHT * 0.03 }}>
          <View style={styles.circle}></View>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={styles.greeting}>Hey,</Text>
          <Text style={styles.greeting}>
            {type == "Register" ? "Register Now." : "Login Now."}
          </Text>
          <View style={{ flexDirection: "row", marginVertical: HEIGHT * 0.04 }}>
            <TouchableOpacity onPress={() => setType("Register")}>
              <Text
                style={{
                  ...styles.optionButton,
                  color: type == "Login" ? "#999" : "#000",
                }}
              >
                If your are new/{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType("Login")}>
              <Text
                style={{
                  ...styles.optionButton,
                  color: type == "Register" ? "#999" : "#000",
                }}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={"Email"}
            placeholderTextColor={"#999999"}
            onFocus={() => setNameInput(true)}
            onChangeText={(text) => setName(text)}
            onEndEditing={(e) => ValidateEmail(e.nativeEvent.text)}
            //style={styles.activeInput}>
            style={nameInput ? styles.activeInput : styles.inactiveInput}
          ></TextInput>
          <Text
            style={{
              alignSelf: "flex-start",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {emailError}
          </Text>
          <TextInput
            onFocus={() => setPassInput(true)}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
            onEndEditing={(e) => StrengthChecker(e.nativeEvent.text)}
            placeholderTextColor={"#999999"}
            style={passInput ? styles.activeInput : styles.inactiveInput}
          ></TextInput>
          <Text
            style={{
              alignSelf: "flex-start",
              color: passwordError == "Strong" ? "green" : "orange",
              fontWeight: "bold",
            }}
          >
            {passwordError}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: HEIGHT * 0.04 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ ...styles.optionButton, color: "#999" }}>
              Forgot Password? /{" "}
            </Text>
          </TouchableOpacity>
          <Text style={{ ...styles.optionButton, color: "#000" }}>Reset</Text>
        </View>
      </View>
      <View style={{ flex: 0.32, marginTop: -20 }}>
        {loading ? (
          <ActivityIndicator size={32} color="cyan" />
        ) : (
          <>
            {type == "Register" ? (
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: disabled ? "grey" : "#b22342",
                }}
                disabled={disabled}
                onPress={() => SignUp()}
              >
                <Text
                  style={{ color: "white", fontSize: 21, fontWeight: "bold" }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: disabled ? "grey" : "#b22342",
                }}
                onPress={() => SignIn()}
                disabled={disabled}
              >
                <Text
                  style={{ color: "white", fontSize: 21, fontWeight: "bold" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <Text
          style={{
            color: "#999",
            fontSize: 15,
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          Skip for Now
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};
//login(true)}>
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: Dimensions.get("screen").height * 0.2,
  },
  greeting: { fontSize: 35, color: "#222", fontWeight: "bold" },
  subContainer: {
    flex: 1,
    padding: Dimensions.get("screen").width * 0.1,
  },
  optionButton: {
    fontSize: 18,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    //textAlign: 'center',
  },
  circle: {
    height: 50,
    width: 25,
    backgroundColor: "black",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  button: {
    backgroundColor: "#b22342",
    width: WIDTH * 0.8,
    alignSelf: "center",
    justifyContent: "center",
    height: HEIGHT * 0.08,
    alignItems: "center",
    borderRadius: 10,
  },
  activeInput: {
    backgroundColor: "#fdcd84",
    height: HEIGHT * 0.08,
    marginVertical: 10,
    borderRadius: 15,
    paddingHorizontal: WIDTH * 0.1,
    fontSize: 20,
    color: "black",
  },
  inactiveInput: {
    backgroundColor: "#f5f5f5",
    height: HEIGHT * 0.08,
    borderRadius: 15,
    paddingHorizontal: WIDTH * 0.1,
    fontSize: 20,
    marginVertical: 10,
    color: "black",
  },
});
//     <View style={{height:50,width:25,backgroundColor:'black',borderTopRightRadius:50,borderBottomRightRadius:50}}></View>
