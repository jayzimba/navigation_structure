import { Text, StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import colors from "../assets/Theme.js/colors";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Icon,
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default class Dashboard extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.bigText}>ADMIN</Text>
          <Text style={styles.smallText}>Pupil control center</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.square, { backgroundColor: colors.primary }]}
              onPress={() => this.props.navigation.navigate("ViewPupils")}
            >
              <MaterialCommunityIcons
                name="account-group-outline"
                size={45}
                color="white"
              />
              <Text style={styles.squareText}>View Pupils</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.square, { backgroundColor: colors.primary }]}
              onPress={() => this.props.navigation.navigate("MapScreen")}
            >
              <MaterialIcons name="track-changes" size={45} color="white" />
              <Text style={styles.squareText}>Track pupils</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.square, { backgroundColor: colors.primary }]}
              onPress={() => this.props.navigation.navigate("Add")}
            >
              <Ionicons name="person" size={55} color={colors.white} />
              <Text style={styles.squareText}>Add Pupil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.square, { backgroundColor: colors.primary }]}
              onPress={() => this.props.navigation.navigate("Gadget GUI")}
            >
              <MaterialIcons name="devices-other" size={55} color="white" />
              <Text style={styles.squareText}>Tracker UI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 28,
    color: colors.primary,
  },
  smallText: {
    color: colors.secondary,
    fontWeight: "500",
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  mainContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  square: {
    borderRadius: 10,
    height: screenWidth / 2,
    width: screenWidth / 2 - 30,
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 22,
    marginTop: 10,
  },
});
