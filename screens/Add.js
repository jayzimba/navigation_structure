import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native";
import colors from "../assets/Theme.js/colors";
import { TextInput } from "react-native-gesture-handler";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { Icon } from "react-native-elements"; // Assuming you're using react-native-elements for icons
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      grade: "",
      studentID: "",
      loading: false,
    };
  }

  RegDataInDB = () => {
    this.setState({
      loading: true,
    });
    var fullname = this.state.fullname;
    var grade = this.state.grade;
    var studentID = this.state.studentID;

    if (fullname.length == null || grade == null || studentID == null) {
      Alert.alert("Incomplete form", "please provide all fields");
    } else {
      var formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("grade", grade);
      formdata.append("studentID", studentID);

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://www.pezabond.com/james/AddPupil.php", requestOptions)
        .then((Response) => Response.json())
        .then((Response) => {
          alert(Response[0].Message);
          if (Response[0].Message == "Added successfuly!") {
            Alert.alert(
              "SUCCESSFUL!!",
              fullname + " has been added with id " + studentID
            );
          } else if (Response[0].Message == "Pupil Already Registered") {
            Alert.alert("FAILED!!", "pupil already existing with that id");
          }
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
        .finally(() =>
          this.setState({
            fullname: "",
            grade: "",
            studentID: "",
            loading: false,
          })
        );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.bigText}>Add Pupil</Text>
          <Text style={styles.smallText}>
            enter the pupil full name, grade and assign id number.
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: colors.gray, fontWeight: "500" }}>
            Full name
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
            <Ionicons
              name="person"
              size={24}
              color={colors.gray}
              style={{ marginEnd: 20 }}
            />

            <TextInput
              placeholder="full name"
              value={this.fullname}
              selectionColor={colors.primary}
              onChangeText={(text) => this.setState({ fullname: text })}
            />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: colors.gray, fontWeight: "500" }}>
            Student ID
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
              color={colors.gray}
              style={{ marginEnd: 20 }}
            />
            <TextInput
              placeholder="student Id"
              value={this.studentID}
              maxLength={6}
              keyboardType="number-pad"
              selectionColor={colors.primary}
              onChangeText={(text) => this.setState({ studentID: text })}
            />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: colors.gray, fontWeight: "500" }}>Grade</Text>

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
            <MaterialCommunityIcons
              name="google-classroom"
              size={24}
              color={colors.gray}
              style={{ marginEnd: 20 }}
            />

            <TextInput
              placeholder="grade"
              value={this.grade}
              maxLength={2}
              keyboardType="number-pad"
              selectionColor={colors.primary}
              onChangeText={(text) => this.setState({ grade: text })}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 50,
          }}
          onPress={() => this.RegDataInDB()}
        >
          <Entypo name="plus" size={24} color="white" />
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              marginStart: 5,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>

        {this.loading && (
          <ActivityIndicator
            size={"large"}
            color={colors.primary}
            style={{ marginVertical: 20 }}
          />
        )}
      </View>
    );
  }
}

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
