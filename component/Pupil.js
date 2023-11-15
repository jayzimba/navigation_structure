import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";

const Pupil = (props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 25,
        paddingBottom: 20,
        marginTop: 20,
        borderBottomColor: "#cfcbcd",
        borderBottomWidth: 0.3,
      }}
    >
      <View style={{ height: 40, flexDirection: "row", alignItems: "center" }}>
        <View style={styles.sider}></View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{props.name}</Text>
          <Text>{props.id}</Text>
        </View>
      </View>
      <View>
        <Text>grade: {props.grade}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Pupil;

const styles = StyleSheet.create({
  sider: {
    backgroundColor: colors.primary,
    width: 2,
    height: "100%",
    marginEnd: 20,
  },
});
