import React, { Component, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, ScrollView, Button } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import SensorComponent1 from '../Components/SensorComponent1';
import SensorComponent2 from '../Components/SensorComponent2';
import SensorComponent3 from '../Components/SensorComponent3';

import MapWithMarkers from "../Components/mapWithMarkers";

const MapScreen = () => {

    const navigation = useNavigation();
    //======= MARKER 1 ================================================================================
    const handleNode1Press = () => {
        console.log("Node 1 Pressed");
        navigation.navigate('Node 1 Details');
    };

    const [sensorData1, setSensorData1] = useState(null);
    const handleDataReceived1 = (latestData) => {
        console.log("Sensor Request Done for Node1Details"); // Log the received data
        setSensorData1(latestData);
    };
    useEffect(() => {
    }, [sensorData1]);

    //======= MARKER 2 ================================================================================
    const handleNode2Press = () => {
        console.log("Node 2 Pressed");
        navigation.navigate('Node 2 Details');
    };

    const [sensorData2, setSensorData2] = useState(null);
    const handleDataReceived2 = (latestData) => {
        console.log("Sensor Request Done for Node2Details"); // Log the received data
        setSensorData2(latestData);
    };
    useEffect(() => {
    }, [sensorData2]);

    //======= MARKER 3 ================================================================================
    const handleNode3Press = () => {
        console.log("Node 3 Pressed");
        navigation.navigate('Node 3 Details');
    };

    const [sensorData3, setSensorData3] = useState(null);
    const handleDataReceived3 = (latestData) => {
        console.log("Sensor Request Done for Node3Details"); // Log the received data
        setSensorData3(latestData);
    };
    useEffect(() => {
    }, [sensorData3]);



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Kumeu River Wines</Text>
            </View>

            <View style={styles.mapContainer}>
                <MapWithMarkers />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.nodeButton} onPress={handleNode1Press}>
                    <Text style={styles.nodeButtonText}>Node 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nodeButton} onPress={handleNode2Press}>
                    <Text style={styles.nodeButtonText}>Node 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nodeButton} onPress={handleNode3Press}>
                    <Text style={styles.nodeButtonText}>Node 3</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: "100%",
        height: "7%",
        backgroundColor: "rgba(0,78,124,1)",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    mapContainer: {
        width: "96%",
        height: "80%",
        marginTop: "2%",
        alignSelf: "center",
        backgroundColor: "grey",
        borderRadius: 20,
        overflow: "hidden",
    },
    mapView: {
        width: "100%",
        height: "100%",
    },
    footer: {
        width: "100%",
        height: "12%",
        marginTop: "2%",
        // backgroundColor: "grey",
        flexDirection: "row",
    },
    nodeButton: {
        width: "30%",
        height: "75%",
        marginTop: "1%",
        marginLeft: "2%",
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    nodeButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    callout: {
        width: "auto",
        height: "auto",
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

});

export default MapScreen;