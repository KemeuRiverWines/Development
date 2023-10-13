import React, { Component, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";

import SensorComponent1 from '../Components/SensorComponent3';
import TempData10Days from '../Components/tempData2DaysNode3';
import NodeTable from '../Components/NodeTable';

import AUTLogo from '../assets/Images/AUTLogo.png';
import Logo from '../assets/Images/Logo.png';

function Node1Details(props) {

    const [selectedDataType, setSelectedDataType] = useState("TEMPERATURE");
    const [sliderValue, setSliderValue] = useState(4);
    const [finalSilderValue, setFinalSliderValue] = useState(4);

    const [sensorData3, setsensorData3] = useState(null);
    const handleDataReceived1 = (latestData) => {
        console.log("Sensor Request Done for Node1Details"); // Log the received data
        setsensorData3(latestData);
    };
    useEffect(() => {
        //console.log("Console Log 1", sensorData3); // This will log the updated value of sensorData3
    }, [sensorData3]);

    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute', // Position it absolutely
                top: '0.5%', // At the top
                right: '0.5%', // On the right
            }}>
                <Image
                    source={AUTLogo} // Replace with your image URL
                    style={{ width: 100, height: 50 }}
                    resizeMode="contain"
                />
            </View>
            <View style={{
                position: 'absolute', // Position it absolutely
                top: '0.5%', // At the top
                left: '0.5%', // On the right
            }}>
                <Image
                    source={Logo} // Replace with your image URL
                    style={{ width: 100, height: 50 }}
                    resizeMode="contain"
                />
            </View>
            <SensorComponent1 onDataReceived={handleDataReceived1} />
            <View style={styles.header}>
                <Text style={styles.node1}>Node 3</Text>
                <Text style={styles.lastUpdated}>
                    {sensorData3 !== null ? (
                        sensorData3.timeAgo !== null ? `Updated ${sensorData3.timeAgo}` : <ActivityIndicator size="large" />
                    ) : null}
                </Text>
            </View>
            <ScrollView style={styles.scrollView}>
            <View style={styles.buttons}>
                <View style={styles.settingsButton}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Node 2 Temperature Forecast')}>
                        <Text style={styles.settingsText}>
                            Forecast Temp
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.mapViewContainer}>
                    <MapView
                        provider={MapView.PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: -36.774704,
                            longitude: 174.568005,
                            latitudeDelta: 0.0025,
                            longitudeDelta: 0.0005,
                        }}
                        customMapStyle={[]}
                        style={styles.mapView}
                        mapType="satellite"
                    >
                        <Marker
                            coordinate={{ latitude: -36.774704, longitude: 174.568005 }}
                            title="Node 1"
                            description="Maties Vineyard"
                        />
                    </MapView>
                </View>
                <View style={styles.dataGroup}>
                    <View style={styles.dataRow1}>
                        <TouchableOpacity onPress={() => { setSelectedDataType('TEMPERATURE'); console.log("TEMPERATURE SELECTED") }}>
                            <View style={styles.temperatureGroup}>
                                <View style={[styles.rect, selectedDataType === 'TEMPERATURE' ? styles.selected : {}]}>
                                    <Text style={styles.temperatureHeader}>Temperature</Text>
                                    <Text style={styles.temperatureData}>
                                        {sensorData3 !== null ? (
                                            sensorData3.temperature !== null ? `${parseFloat(sensorData3.temperature).toFixed(1)}°c` : <ActivityIndicator size="large" />
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectedDataType('HUMIDITY'); console.log("HUMIDITY SELECTED") }}>
                            <View style={styles.humidityGroup}>
                                <View style={[styles.rect1, selectedDataType === 'HUMIDITY' ? styles.selected : {}]}>
                                    <Text style={styles.humidityHeader}>Humidity</Text>
                                    <Text style={styles.humidityData1}>
                                        {sensorData3 !== null ? (
                                            sensorData3.humidity !== null ? `${sensorData3.humidity}` : <ActivityIndicator size="large" />
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectedDataType('DEWPOINT'); console.log("DEWPOINT SELECTED") }}>
                            <View style={styles.dewPointGroup}>
                                <View style={[styles.rect2, selectedDataType === 'DEWPOINT' ? styles.selected : {}]}>
                                    <Text style={styles.dewPointHeader}>Dew Point</Text>
                                    <Text style={styles.dewPointData}>
                                        {sensorData3 !== null ? (
                                            sensorData3.dew_point !== null ? `${sensorData3.dew_point}` : <ActivityIndicator size="large" />
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectedDataType('LEAFWETNESS'); console.log("LEAFWETNESS SELECTED") }}>
                            <View style={styles.leafWetnessGroup}>
                                <View style={[styles.rect4, selectedDataType === 'LEAFWETNESS' ? styles.selected : {}]}>
                                    <Text style={styles.leafWetness2}>Leaf Wetness</Text>
                                    <Text style={styles.humidityData2}>
                                        {sensorData3 !== null ? (
                                            sensorData3.leaf_wetness !== null ? `${sensorData3.leaf_wetness}%` : <ActivityIndicator size="large" />
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.dataRow2}> */}
                    {/* <View style={styles.windSpeedGroup}>
                            <View gradientImage="Gradient_WU95P46.png" style={styles.rect3}>
                                <Text style={styles.windSpeedHeader}>Wind Speed</Text>
                                <Text style={styles.windSpeedData}>
                                    {sensorData3 !== null ? (
                                        sensorData3.wind_speed !== null ? `${sensorData3.wind_speed}` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View> */}
                    {/* <View style={styles.rainFallGroup}>
                            <View style={styles.rect5}>
                                <Text style={styles.rainFall2}>Rain Fall</Text>
                                <Text style={styles.dewPointData1}>{sensorData3 !== null ? (
                                    sensorData3.rainfall !== null ? `${sensorData3.rainfall}` : <ActivityIndicator size="large" />
                                ) : null}</Text>
                            </View>
                        </View> */}
                    {/* </View> */}
                </View>
                <View>
                    <Text style={{ alignContent: "center", alignSelf: "center" , fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>Data for the last: {sliderValue} days</Text>
                    <Slider
                        style={{ width: "80%", height: 20, alignContent: "center", alignSelf: "center" }}
                        minimumValue={1}
                        maximumValue={10}
                        value={finalSilderValue}
                        step={1}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="rgba(0,78,124,1)"
                        onValueChange={(value) => {
                            console.log(`Value changed to ${value}`);
                            setSliderValue(value);
                        }}
                        onSlidingComplete={(value) => {
                            console.log(`Sliding completed with final value ${value}`);
                            setFinalSliderValue(value);
                        }}
                    />
                </View>
                <View>
                    <TempData10Days selectedDataType={selectedDataType} selectedDays={finalSilderValue}/>
                </View>
                <View>
                    <NodeTable selectedDataType={selectedDataType} nodeID={"eui-70b3d57ed006182e"} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "rgba(255,255,255,1)",
    },
    header: {
        width: "60%",
        height: "10%",
        backgroundColor: "rgba(0,78,124,1)",
        margin: 0,
        // marginTop: 60,
        alignItems: "center",
        borderRadius: 20,
    },
    node1: {
        color: "white",
        fontSize: 30,
        width: 133,
        height: 40,
        textAlign: "center",
        marginTop: 8,
        // marginLeft: 26
    },
    selected: {
        backgroundColor: 'rgba(1,49,77,1)',
    },
    lastUpdated: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        height: "auto",
        width: 300,
        marginTop: 7
    },
    dataGroup: {
        width: 360,
        height: "auto",
        alignSelf: "center",
        alignItems: "center",
        margin: 0,
        marginTop: 20
    },
    dataRow1: {
        width: 360,
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        margin: 5
    },
    temperatureGroup: {
        width: 103,
        height: 100
    },
    rect: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "rgba(0,78,124,1)"
    },
    temperatureHeader: {
        color: "white",
        textAlign: "center",
        // height: 17,
        // width: 100,
        marginTop: 11
    },
    temperatureData: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    humidityGroup: {
        width: 103,
        height: 100
    },
    rect1: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20
    },
    humidityHeader: {
        color: "white",
        textAlign: "center",
        marginTop: 11
    },
    humidityData1: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    dewPointGroup: {
        width: 103,
        height: 100
    },
    rect2: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20
    },
    dewPointHeader: {
        color: "white",
        textAlign: "center",
        marginTop: 11
    },
    dewPointData: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    dataRow2: {
        width: 360,
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        margin: 10
    },
    windSpeedGroup: {
        width: 103,
        height: 100
    },
    rect3: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "rgba(0,78,124,1)"
    },
    windSpeedHeader: {
        color: "white",
        textAlign: "center",
        marginTop: 11
    },
    windSpeedData: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    leafWetnessGroup: {
        width: 103,
        height: 100
    },
    rect4: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20
    },
    leafWetness2: {
        color: "white",
        textAlign: "center",
        marginTop: 11
    },
    humidityData2: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    rainFallGroup: {
        width: 103,
        height: 100
    },
    rect5: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20
    },
    rainFall2: {
        color: "white",
        textAlign: "center",
        marginTop: 11
    },
    dewPointData1: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 12
    },
    mapView: {
        width: "100%",
        height: "100%",
    },
    mapViewContainer: {
        height: 150,
        width: "96%",
        margin: 0,
        marginTop: 10,
        alignSelf: "center",
        overflow: "hidden",
        backgroundColor: "grey",
        borderRadius: 20,
    },
    scrollView: {
        alignContent: "center",
        width: "100%",
        marginTop: 10,
    },
    settingsButton: {
        width: 100,
        height: 50,
        backgroundColor: "rgba(0,78,124,1)",
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    settingsText: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Node1Details;
