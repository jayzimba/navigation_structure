import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import colors from "../assets/Theme.js/colors";
import Pupil from "../component/Pupil";
import { FlatList } from "react-native";

const ViewPupil = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var formdata = new FormData();
    formdata.append("companyID", 1);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://www.pezabond.com/james/fetchPupils.php",
        requestOptions
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={colors.success}
          style={{ marginBottom: 20 }}
        />
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.studentID.toString()}
        renderItem={({ item }) => (
          <Pupil name={item.fullname} id={item.studentID} grade={item.grade} />
        )}
      />
    </View>
  );
};

export default ViewPupil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
