import React, { Component, useRef, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import SensorComponent1 from '../Components/SensorComponent1';

function GeneralTempDash() {

  const [sensorData1, setSensorData1] = useState(null);

  const handleDataReceived1 = (latestData) => {
    //console.log("Received data:", latestData); // Log the received data
    setSensorData1(latestData);
  };
  useEffect(() => {
    //console.log("Console Log 1", sensorData1); // This will log the updated value of sensorData1
  }, [sensorData1]);

  
  return (
    <View style={styles.container}>
      <View style={styles.generalTempDash}>
        <View style={styles.rect}>
          <View style={styles.tempHeaderRow}>
            <Text style={styles.tempHeader}>Temperature</Text>
            <Text style={styles.rainHeader}>Rain Fall</Text>
          </View>
          <View style={styles.currentHeaderRow}>
            <SensorComponent1 onDataReceived={handleDataReceived1} />
            <Text style={styles.currentHeader}>Current</Text>
            <Text style={styles.tempCurrent}>
              {/* {sensorData1.temperature !== null ? `${sensorData1.temperature}°c` : <ActivityIndicator size="large" />} */}
              {sensorData1 !== null ? (
      sensorData1.temperature !== null ? `${sensorData1.temperature}°c` : <ActivityIndicator size="large" />
    ) : null}
            </Text>
            <Text style={styles.rainCurrent}>
              {/* {sensorData1.rainfall !== null ? `${sensorData1.rainfall}` : <ActivityIndicator size="large" />} */}
              {sensorData1 !== null ? (
      sensorData1.rainfall !== null ? `${sensorData1.rainfall}` : <ActivityIndicator size="large" />
    ) : null}
            </Text>
          </View>
          <View style={styles.next15Row}>
            <Text style={styles.next15Header}>Next 15</Text>
            <Text style={styles.tempNext15}>00.00°c</Text>
            <Text style={styles.rainNext15}>22.00</Text>
          </View>
          <View style={styles.next60HeaderRow}>
            <Text style={styles.next60Header}>Next 60</Text>
            <Text style={styles.tempNext60}>00.00°c</Text>
            <Text style={styles.rainNext60}>22.00</Text>
          </View>
          <Text style={styles.updated}>
          {sensorData1 !== null ? (
      sensorData1.timeAgo !== null ? `Updated ${sensorData1.timeAgo}` : <ActivityIndicator size="large" />
    ) : null}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    marginBottom: 20,
  },
  generalTempDash: {
    
    backgroundColor: "#004E7C"
    
  },
  rect: {
    
  },
  tempHeader: {
    fontSize: 25,
    color: "#FFFFFF",
    marginBottom: -10,
    
  },
  rainHeader: {
    
    fontSize: 25,
    color: "#FFFFFF",
    marginBottom: -10,
    marginLeft: 40
    
  },
  tempHeaderRow: {
    height: 35,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 135,
    marginRight: 50
  },
  currentHeader: {
    color: "#FFFFFF",
    fontSize: 25,
    marginTop: 10
  },
  tempCurrent: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  rainCurrent: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  currentHeaderRow: {
    height: 40,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 42,
    marginRight: 63
  },
  next15Header: {
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    marginTop: 10
  },
  tempNext15: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  rainNext15: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  next15Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 40,
    marginRight: 63
  },
  next60Header: {

    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    marginTop: 10
  },
  tempNext60: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  rainNext60: {
    color: "#FFFFFF",
    fontSize: 40,
    marginLeft: 30,
    marginBottom: -10,
  },
  next60HeaderRow: {
    height: 40,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 40,
    marginRight: 63
  },
  updated: {
    marginTop: 30,
    marginLeft: 0,
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: -50,
    textAlign: 'center',
  }
});

export default GeneralTempDash;