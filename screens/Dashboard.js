import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class Dashboard extends Component {
  render() {
    return (
      <View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Add Pupil Button */}
          <TouchableOpacity onPress={() => navigation.navigate("AddPupil")}>
            <Ionicons name="person-add-outline" size={32} color="blue" />
            <Text>Add Pupil</Text>
          </TouchableOpacity>

          {/* View Pupils Button */}
          <TouchableOpacity onPress={() => navigation.navigate("ViewPupils")}>
            <Ionicons name="list-outline" size={32} color="green" />
            <Text>View Pupils</Text>
          </TouchableOpacity>

          {/* Track Pupils Button */}
          <TouchableOpacity onPress={() => navigation.navigate("TrackPupils")}>
            <Ionicons name="location-outline" size={32} color="red" />
            <Text>Track Pupils</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
