import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native";
import colors from "../assets/Theme.js/colors";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { Icon } from "react-native-elements"; // Assuming you're using react-native-elements for icons
import { ActivityIndicator } from "react-native";

const Login = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState("");

  const authenticateWithBiometrics = async () => {
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
    if (hasBiometrics) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to pay",
      });

      if (result.success) {
        navigation.replace("Dashboard");
        setLoading(false);
      } else {
        Alert.alert("Biometric Authentication Failed", "Please try again.");
      }
    }
  };

  const handlePayment = () => {
    setLoading(true);
    authenticateWithBiometrics();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.bigText}>Admin Login</Text>
        <Text style={styles.smallText}>
          USe your registered Biometrics to access the admin control center.
        </Text>
      </View>

      <Text style={{ color: colors.gray, fontWeight: "500" }}>Admin ID</Text>

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
        <MaterialIcons
          name="admin-panel-settings"
          size={24}
          color={colors.gray}
          style={{ marginEnd: 20 }}
        />

        <TextInput
          placeholder="Admin ID"
          value={admin}
          selectionColor={colors.primary}
          onChangeText={(text) => setAdmin(text)}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
          borderRadius: 20,
        }}
        onPress={() => handlePayment()}
      >
        <Text style={{ color: colors.white, fontSize: 18 }}>Login</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && (
          <ActivityIndicator
            size={"large"}
            color={colors.success}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
