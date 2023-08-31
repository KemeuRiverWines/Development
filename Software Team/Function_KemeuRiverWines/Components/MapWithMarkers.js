import React, { Component, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, ScrollView, Button } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import SensorComponent1 from './SensorComponent1';
import SensorComponent2 from './SensorComponent2';
import SensorComponent3 from './SensorComponent3';

const MapWithMarker = () => {

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
        // this.marker1.Callout.show();
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

            <SensorComponent1 onDataReceived={handleDataReceived1} />
            <SensorComponent2 onDataReceived={handleDataReceived2} />
            <SensorComponent3 onDataReceived={handleDataReceived3} />

            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -36.775676,
                    longitude: 174.567283,
                    latitudeDelta: 0.0070,
                    longitudeDelta: 0.0070,
                }}
                customMapStyle={[]}
                style={styles.mapView}
                mapType="satellite"
                showsUserLocation={true}
                >
                <Marker
                    coordinate={{ latitude: -36.777639, longitude: 174.565313 }}>
                    <Callout onPress={handleNode1Press}>
                        <View style={styles.callout}>
                            <Text>Node 1</Text>
                            <Text>
                                {sensorData1 !== null ? (
                                    sensorData1.timeAgo !== null ? `Updated ${sensorData1.timeAgo}` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData1 !== null ? (
                                    sensorData1.temperature !== null ? `Temperature: ${sensorData1.temperature}°c` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData1 !== null ? (
                                    sensorData1.humidity !== null ? `Humidity: ${sensorData1.humidity}%` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Button title="See More" />
                        </View>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{ latitude: -36.775292, longitude: 174.566299 }}>
                    <Callout onPress={handleNode2Press}>
                        <View style={styles.callout}>
                            <Text>Node 2</Text>
                            <Text>
                                {sensorData2 !== null ? (
                                    sensorData2.timeAgo !== null ? `Updated ${sensorData2.timeAgo}` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData2 !== null ? (
                                    sensorData2.temperature !== null ? `Temperature: ${sensorData2.temperature}°c` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData2 !== null ? (
                                    sensorData2.humidity !== null ? `Humidity: ${sensorData2.humidity}%` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Button title="See More" />
                        </View>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{ latitude: -36.775706, longitude: 174.568581 }}>
                    <Callout onPress={handleNode3Press}>
                        <View style={styles.callout}>
                            <Text>Node 3</Text>
                            <Text>
                                {sensorData3 !== null ? (
                                    sensorData3.timeAgo !== null ? `Updated ${sensorData3.timeAgo}` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData3 !== null ? (
                                    sensorData3.temperature !== null ? `Temperature: ${sensorData3.temperature}°c` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Text>
                                {sensorData3 !== null ? (
                                    sensorData3.humidity !== null ? `Humidity: ${sensorData3.humidity}%` : <ActivityIndicator size="large" />
                                ) : null}
                            </Text>
                            <Button title="See More" />
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapView: {
        width: "100%",
        height: "100%",
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

export default MapWithMarker;