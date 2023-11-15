import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import colors from "../assets/Theme.js/colors";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements"; // Assuming you're using react-native-elements for icons
import { ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useNavigationState } from "@react-navigation/native";

const GadgetEnd = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(colors.danger);
  const [iconName, setIconName] = useState("play-circle-outline");
  const [displayText, setDisplayText] = useState("Stopped");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords); // Store latitude and longitude in state
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardOpen(false)
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const toggleState = () => {
    if (isRunning) {
      setIsRunning(false);
      setBackgroundColor(colors.danger);
      setIconName("play-circle-outline");
      setDisplayText("OFF");
    } else {
      setIsRunning(true);
      setLoading(true);
      setBackgroundColor(colors.success);
      setIconName("stop-circle-outline");
      setDisplayText("ON");
      fetchLocation();
    }
  };

  const sendCoords = async () => {
    setLoading("true");
    var studentID = id;
    var latitude = location.latitude;
    var longitude = location.longitude;

    if (isRunning) {
      setIsRunning(false);
      setBackgroundColor(colors.danger);
      setIconName("play-circle-outline");
      setDisplayText("OFF");

      return;
    }

    var formdata = new FormData();
    formdata.append("studentID", studentID);
    formdata.append("latitude", latitude);
    formdata.append("longitude", longitude);

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    // Alert.alert(
    //   "Gadget Location Details",
    //   "Sending: " + latitude + "," + longitude
    // );

    fetch("https://www.pezabond.com/james/sendCoords.php", requestOptions)
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response[0].Message == "Pupil not Found") {
          if (isRunning) {
            setIsRunning(false);
            setBackgroundColor(colors.danger);
            setIconName("play-circle-outline");
            setDisplayText("OFF");
          }
          Alert.alert("Response", Response[0].Message);
        } else if (
          Response[0].Message == "Device successfully mapped to pupil"
        ) {
          if (!isRunning) {
            setIsRunning(true);
            setBackgroundColor(colors.success);
            setIconName("stop-circle-outline");
            setDisplayText("ON");
            fetchLocation();
          }
          Alert.alert("Response", Response[0].Message);
        }
        // if(Response[0])
      })
      .catch((error) => {
        Alert.alert("ERROR", error);
        setId("");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.bigText}>Gadget UI</Text>
        <Text style={styles.smallText}>
          Enter pupil ID to link gadget to pupil details
        </Text>
      </View>

      <Text style={{ color: colors.gray, fontWeight: "500" }}>
        Student id Number
      </Text>

      <View
        style={{
          marginTop: 10,
          backgroundColor: colors.lightgray,
          borderRadius: 20,
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="idcard"
          size={24}
          color={colors.gray}
          style={{ marginEnd: 20 }}
        />
        <TextInput
          placeholder="Pupil ID"
          value={id}
          selectionColor={colors.primary}
          onEndEditing={() => setShow(true)}
          onFocus={() => setShow(false)}
          onChangeText={(id) => {
            setId(id);
            setShow(false);
          }}
        />
      </View>

      {!id.length == 0 && show && !isKeyboardOpen && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {loading && (
            <ActivityIndicator
              size={"large"}
              color={colors.success}
              style={{ marginBottom: 20 }}
            />
          )}
          <TouchableOpacity onPress={sendCoords}>
            <View
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: backgroundColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={iconName} type="ionicon" size={100} color="white" />
              <Text style={{ fontSize: 20, color: "white" }}>
                {displayText}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: "70%", marginTop: 20 }}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "400" }}
            >
              Click the button above to start sending the device coordinates to
              the receiver
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GadgetEnd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 33,
    color: colors.primary,
  },
  smallText: {
    color: colors.secondary,
    fontWeight: "500",
  },
});
