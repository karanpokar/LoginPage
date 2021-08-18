import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Camera from "./Camera";

import TextField from "./TextField";
import Calculator from "./Calculator";
import messaging from "@react-native-firebase/messaging";

import functions from "@react-native-firebase/functions";

const requestUserPermission = async () => {
  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  };

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken(); 
  }
};

const Notifications = () => {
  const [token, setToken] = useState("");
  getFcmToken = async () => {
    await messaging()
      .getToken()
      .then((tkn) => {
        setToken(tkn);
      });
    if (token) {
    } else {
      console.log("Failed", "No token received");
    }
  };
  getFcmToken();
  const getVal = async (token) => {
    await functions()
      .httpsCallable("sendNotification")(token)
      .then((response) => {
        console.log("Response", response);
      })
      .catch((error) => console.log("Error", error));
  };
  return (
    <View style={{ flex: 1, justifyContent: "center",backgroundColor:'#222' }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          width: 200,
          height: 60,
          backgroundColor: "red",
          borderRadius: 20,
          elevation: 6,
        }}
        onPress={() => getVal(token)}
      >
        <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createMaterialBottomTabNavigator();

export default function Dashboard() {
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setMessage({
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
      setVisibleNotification(true);
      setTimeout(() => {
        setVisibleNotification(false);
      }, 4000);
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Modal
        transparent={true}
        visible={visibleNotification}
        animationType={"fade"}
      >
        <TouchableOpacity
          onPress={() => setVisibleNotification(false)}
          style={{
            height: 100,
            width: Dimensions.get("screen").width - 20,
            padding: 15,
            backgroundColor: "lightblue",
            margin: 20,
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
            {message.title}
          </Text>
          <Text style={{ color: "black", fontSize: 18 }}>{message.body}</Text>
        </TouchableOpacity>
      </Modal>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="Notification"
          activeColor="white"
          inactiveColor="grey"
          barStyle={{ backgroundColor: "#222" }}
        >
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarLabel: "Notifications",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Text"
            component={TextField}
            options={{
              tabBarLabel: "Text",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="note" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Photo"
            component={Camera}
            options={{
              tabBarLabel: "Photo",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="camera-image"
                  color={color}
                  size={26}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Calculator"
            component={Calculator}
            options={{
              tabBarLabel: "Calculator",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="calculator-variant"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
