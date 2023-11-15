import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Details from "./screens/Details";
import MapScreen from "./screens/MapScreen";
import GadgetEnd from "./screens/GadgetEnd";
import PupilDetails from "./screens/GadgetEnd";
import Add from "./screens/Add";
import ViewPupil from "./screens/ViewPupil";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Biometric Access",
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Gadget user interface",
          }}
          name="Gadget GUI"
          component={GadgetEnd}
        />

        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Add Pupil",
          }}
          name="Add"
          component={Add}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "View All Pupil",
          }}
          name="ViewPupils"
          component={ViewPupil}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
