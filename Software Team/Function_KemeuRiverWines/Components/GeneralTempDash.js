import React, { Component, useRef, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import SensorComponent1 from '../Components/SensorComponent1';
import WeatherAirTemp from "./WeatherAirTemp";
import WeatherHumid from "./WeatherHumid";

function Index() {

  const [sensorData1, setSensorData1] = useState(null);

  const handleDataReceived1 = (latestData) => {
    console.log("Sensor Request Done for GeneralTempDash"); // Log the received data
    setSensorData1(latestData);
  };
  useEffect(() => {
    //console.log("Console Log 1", sensorData1); // This will log the updated value of sensorData1
  }, [sensorData1]);

  return (
    <View style={styles.container}>
      <SensorComponent1 onDataReceived={handleDataReceived1} />
      <View style={styles.rect}>
        <View style={styles.temperatureGroup}>
          <Text style={styles.tempHeader}>Temperature</Text>
          <View style={styles.currentGroupRow}>
            <View style={styles.currentGroup}>
              <Text style={styles.currentHeader}>Current</Text>
              <Text style={styles.tempCurrent}>
                <WeatherAirTemp />
              </Text>
            </View>
            <View style={styles.next15Group}>
              <Text style={styles.next15Header}>Next 15</Text>
              <Text style={styles.tempNext15}>00.00</Text>
            </View>
            <View style={styles.next60Group}>
              <Text style={styles.next60Header}>Next 60</Text>
              <Text style={styles.tempNext60}>00.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.humidityGroupRow}>
          <View style={styles.humidityGroup}>
            <View style={styles.humidityStack}>
              <Text style={styles.humidity}>Humidity</Text>
              <Text style={styles.humidityCurrent}>
                <WeatherHumid />
              </Text>
            </View>
          </View>
          <View style={styles.dewPointGroup}>
            <View style={styles.dewPointStack}>
              <Text style={styles.dewPoint}>Dew Point</Text>
              <Text style={styles.dewPointCurrent}>22.00</Text>
            </View>
          </View>
        </View>
        <Text style={styles.updated}>
          {sensorData1 !== null ? (
            sensorData1.timeAgo !== null ? `Updated ${sensorData1.timeAgo}` : <ActivityIndicator size="large" />
          ) : null}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 450,
    height: 220
  },
  rect: {
    // width: 430,
    backgroundColor: "rgba(0,78,124,1)",
    // flex: 1
  },
  temperatureGroup: {
    width: 450,
    height: 109,
    marginTop: 10
  },
  tempHeader: {
    color: "#FFFFFF",
    width: 270,
    height: 34,
    fontSize: 25,
    marginLeft: -15,
    fontWeight: '500',
    textAlign: "center",
    alignSelf: "center"
  },
  currentGroup: {
    marginLeft: -20,
    // width: 71,
    height: 67
  },
  currentHeader: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 3
  },
  tempCurrent: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
    // marginTop: 27
  },
  next15Group: {
    // width: 71,
    height: 67,
    marginLeft: 39
  },
  next15Header: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 2
  },
  tempNext15: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
    // marginTop: 27
  },
  next60Group: {
    // width: 71,
    height: 67,
    marginLeft: 42
  },
  next60Header: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 3
  },
  tempNext60: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
    // marginTop: 27
  },
  currentGroupRow: {
    height: 67,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 80,
    marginRight: 76
  },
  humidityGroup: {
    width: 225,
    height: 75
  },
  humidity: {
    top: 0,
    position: "absolute",
    color: "#FFFFFF",
    left: 0,
    fontSize: 25,
    textAlign: "center",
    fontWeight: '500',
    right: 0
  },
  humidityCurrent: {
    top: 35,
    left: 70,
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center"
  },
  humidityStack: {
    height: 41
  },
  dewPointGroup: {
    width: 220,
    height: 74,
    marginTop: 1
  },
  dewPoint: {
    fontWeight: '500',
    top: 0,
    position: "absolute",
    color: "#FFFFFF",
    left: -36,
    fontSize: 25,
    textAlign: "center",
    right: 0
  },
  dewPointCurrent: {
    top: 34,
    left: 55,
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center"
  },
  dewPointStack: {
    height: 41
  },
  humidityGroupRow: {
    height: 75,
    flexDirection: "row",
    marginTop: 18,
    marginRight: 5
  },
  updated: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    marginLeft: 0
  }
});

export default Index;
