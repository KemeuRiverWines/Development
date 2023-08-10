import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import SensorComponent1 from '../Components/SensorComponent1';

function Index(props) {
    return (
        <View style={styles.container}>
            <View style={styles.rect1}></View>
            <View style={styles.group4}>
                <Icon name="location-pin" style={styles.icon}></Icon>
                <Text style={styles.buttonheader}>Node 1</Text>
            </View>
            <View style={styles.group6}>
                <Text style={styles.temperature}>Temperature</Text>
                <Text style={styles.temperatureData}>15.00</Text>
            </View>
            <View style={styles.group2}>
                <Text style={styles.humidity}>Humidity</Text>
                <Text style={styles.humitidtyData}>15.00</Text>
            </View>
            <View style={styles.group3}>
                <Text style={styles.windSpeed}>Wind Speed</Text>
                <Text style={styles.windSpeedData}>15.00</Text>
            </View>
            <View style={styles.group5}>
                <Text style={styles.rainFall}>Rain Fall</Text>
                <Text style={styles.rainFallData}>15.00</Text>
            </View>
            <View style={styles.group7}>
                <Text style={styles.updated}>Updated</Text>
                <Text style={styles.updatedData}>00 Minutes Ago</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 150
    },
    rect1: {
        top: 0,
        left: 0,
        height: "100%",
        position: "absolute",
        backgroundColor: "#CCCCCC",
        right: 0
    },
    group4: {
        width: "25.6%",
        height: "75.95%",
        position: "absolute",
        right: 265,
        bottom: 18
    },
    icon: {
        top: 0,
        left: 5,
        position: "absolute",
        color: "rgba(128,128,128,1)",
        fontSize: 80
    },
    buttonheader: {
        top: 77,
        left: 0,
        position: "absolute",
        color: "#121212",
        fontSize: 29
    },
    group6: {
        top: 13,
        left: 133,
        width: 161,
        height: 17,
        position: "absolute"
    },
    temperature: {
        top: 0,
        left: 0,
        position: "absolute",

        color: "#121212",
        width: 88
    },
    temperatureData: {
        top: 0,
        left: 126,
        position: "absolute",

        color: "#121212"
    },
    group2: {
        top: 38,
        left: 133,
        width: 160,
        height: 17,
        position: "absolute"
    },
    humidity: {
        top: 0,
        left: 0,
        position: "absolute",

        color: "#121212"
    },
    humitidtyData: {
        top: 0,
        left: 125,
        position: "absolute",

        color: "#121212"
    },
    group3: {
        top: 62,
        left: 133,
        width: 162,
        height: 17,
        position: "absolute"
    },
    windSpeed: {
        top: 0,
        left: 0,
        position: "absolute",

        color: "#121212"
    },
    windSpeedData: {
        top: 0,
        left: 127,
        position: "absolute",

        color: "#121212",
        width: 44
    },
    group5: {
        top: 88,
        left: 133,
        width: 139,
        height: 44,
        position: "absolute"
    },
    rainFall: {
        top: 0,
        left: 0,
        position: "absolute",

        color: "#121212"
    },
    rainFallData: {
        top: 0,
        left: 128,
        position: "absolute",

        color: "#121212",
        width: 44
    },
    group7: {
        top: 119,
        left: 133,
        width: 196,
        height: 17,
        position: "absolute"
    },
    updated: {
        top: 0,
        left: 0,
        position: "absolute",

        color: "#121212"
    },
    updatedData: {
        position: "absolute",

        color: "#121212",
        right: 0,
        top: "0%"
    }
});

export default Index;