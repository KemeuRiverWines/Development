import React, { Component, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import TempData10Days from '../Components/HortPlusGraph.js';
import HortPlusApiRequest from '../Components/HortPlusApiRequest.js';

import AUTLogo from '../assets/Images/AUTLogo.png';
import Logo from '../assets/Images/Logo.png';

function Node3Details(props) {

    const [weatherData, setWeatherData] = useState(null);
    const [temp, setTemp] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [leafWetness, setLeafWetness] = useState(null);
    const [rainfall, setRainfall] = useState(null);
    const [dewPoint, setDewPoint] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [timeStamp, setTimeStamp] = useState(null);
    const [selectedDataType, setSelectedDataType] = useState('TDDATA');


    useEffect(() => {
        if (temp && dewPoint) {
            let T = parseFloat(temp);
            let TD = parseFloat(dewPoint);
            let Es = 6.11 * Math.pow(10, (7.5 * T) / (237.7 + T));
            let E = 6.11 * Math.pow(10, (7.5 * TD) / (237.7 + TD));
            let RH = (E / Es) * 100;
            setHumidity(RH.toFixed(1));
        }
    }, [temp, dewPoint]);

    const handleDataReceived = (data) => {
        setWeatherData(data);
        if (data.TDDATA && data.TDDATA.length > 0) {
            lastTemperature = data.TDDATA[data.TDDATA.length - 1];
            setTemp(parseFloat(lastTemperature).toFixed(1));  // Set the temperature to the last element of TDDATA with 1 decimal place
        }
        if (data.WSDATA && data.WSDATA.length > 0) {
            lastWindSpeed = data.WSDATA[data.WSDATA.length - 1];
            setWindSpeed(parseFloat(lastWindSpeed).toFixed(1));  // Set the wind speed to the last element of WSDATA with 1 decimal place
        }
        if (data.LSDATA && data.LSDATA.length > 0) {
            lastLeafWetness = data.LSDATA[data.LSDATA.length - 1];
            setLeafWetness(parseFloat(lastLeafWetness).toFixed(0));  // Set the leaf wetness to the last element of LSDATA with 1 decimal place
        }
        if (data.RNDATA && data.RNDATA.length > 0) {
            lastRainfall = data.RNDATA[data.RNDATA.length - 1];
            setRainfall(parseFloat(lastRainfall).toFixed(1));  // Set the rainfall to the last element of RNDATA with 1 decimal place
        }
        if (data.DPDATA && data.DPDATA.length > 0) {
            lastDewPoint = data.DPDATA[data.DPDATA.length - 1];
            setDewPoint(parseFloat(lastDewPoint).toFixed(1));  // Set the dew point to the last element of DPDATA with 1 decimal place
        }
        if (data.STOPSTAMP && data.STOPSTAMP.length > 0) {
            lastTimeStamp = data.STOPSTAMP[data.STOPSTAMP.length - 1];
            x = new Date(lastTimeStamp * 1000);
            setTimeStamp(x);  // Set the timestamp to the last element of STOPSTAMP
        }
    };

    return (
        <View style={styles.container}>
            <HortPlusApiRequest onDataReceived={handleDataReceived} />

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

            <View style={styles.header}>
                <Text style={styles.node1}>Hort Plus</Text>
                <Text style={styles.lastUpdated}>
                    {timeStamp !== null ? (
                        timeStamp !== null ? `${timeStamp.toLocaleString()}` : <ActivityIndicator size="large" />
                    ) : null}
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.mapViewContainer}>
                    <MapView
                        provider={MapView.PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: -36.77723,
                            longitude: 174.56915,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.0025,
                        }}
                        customMapStyle={[]}
                        style={styles.mapView}
                        mapType="satellite"
                    >
                        <Marker
                            coordinate={{ latitude: -36.77723, longitude: 174.56915 }}
                            title="Node 1"
                            description="Maties Vineyard"
                        />
                    </MapView>
                </View>
                <View style={styles.dataGroup}>
                    <View style={styles.dataRow1}>
                        <TouchableOpacity onPress={() => {setSelectedDataType('TDDATA'); console.log()}}>
                            <View style={styles.temperatureGroup}>
                                <View style={[styles.rect, selectedDataType === 'TDDATA' ? styles.selected : {}]}>
                                    <Text style={styles.temperatureHeader}>Temperature</Text>
                                    <Text style={styles.temperatureData}>
                                        {temp !== null ? (
                                            temp !== null ? `${temp}°c` : <ActivityIndicator size="large" />
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSelectedDataType('RHDATA'); console.log("RHDATA Selected")}}>
                        <View style={styles.humidityGroup}>
                            <View style={[styles.rect1, selectedDataType === 'RHDATA' ? styles.selected : {}]}>
                                <Text style={styles.humidityHeader}>Humidity</Text>
                                <Text style={styles.humidityData1}>
                                    {humidity !== null ? (
                                        humidity !== null ? `${humidity}%` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSelectedDataType('DPDATA'); console.log("DPDATA Selected")}}>
                        <View style={styles.dewPointGroup}>
                            <View style={[styles.rect2 , selectedDataType === 'DPDATA' ? styles.selected : {}]}>
                                <Text style={styles.dewPointHeader}>Dew Point</Text>
                                <Text style={styles.dewPointData}>
                                    {dewPoint !== null ? (
                                        dewPoint !== null ? `${dewPoint}` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataRow2}>
                        <TouchableOpacity onPress={() => {setSelectedDataType('WSDATA'); console.log("WSDATA Selected")}}>
                        <View style={styles.windSpeedGroup}>
                            <View style={[styles.rect3, selectedDataType === 'WSDATA' ? styles.selected : {}]}>
                                <Text style={styles.windSpeedHeader}>Wind Speed</Text>
                                <Text style={styles.windSpeedData}>
                                    {windSpeed !== null ? (
                                        windSpeed !== null ? `${windSpeed}` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSelectedDataType('LSDATA'); console.log("LSDATA Selected")}}>
                        <View style={styles.leafWetnessGroup}>
                            <View style={[styles.rect4, selectedDataType === 'LSDATA' ? styles.selected : {}]}>
                                <Text style={styles.leafWetness2}>Leaf Wetness</Text>
                                <Text style={styles.humidityData2}>
                                    {leafWetness !== null ? (
                                        leafWetness !== null ? `${leafWetness}%` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSelectedDataType('RNDATA'); console.log("RNDATA Selected")}}>
                        <View style={styles.rainFallGroup}>
                            <View style={[styles.rect5, selectedDataType === 'RNDATA' ? styles.selected : {}]}>
                                <Text style={styles.rainFall2}>Rain Fall</Text>
                                <Text style={styles.dewPointData1}>
                                    {rainfall !== null ? (
                                        rainfall !== null ? `${rainfall}` : <ActivityIndicator size="large" />
                                    ) : null}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TempData10Days selectedDataType={selectedDataType}/>
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
    selected: {
        backgroundColor: 'rgba(1,49,77,1)',
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
        height: 241,
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
        height: 17,
        width: 100,
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
        width: "90%",
        margin: 0,
        marginTop: 30,
        alignSelf: "center",
        overflow: "hidden",
        backgroundColor: "grey",
        borderRadius: 20,
    },
    scrollView: {
        alignContent: "center",
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

export default Node3Details;
