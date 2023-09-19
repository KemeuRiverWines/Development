import React, { Component, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, ScrollView, Button, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import MapWithMarkers from "../Components/MapWithMarkers";

import AUTLogo from '../assets/Images/AUTLogo.png';
import Logo from '../assets/Images/Logo.png';

const MapScreen = () => {

    const [refresh, setRefresh] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey((prevKey) => prevKey + 1);
            console.log("Reloaded Map");
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const navigation = useNavigation();

    const handleNode1Press = () => {
        console.log("Node 1 Pressed");
        navigation.navigate('Node 1 Details');
    };

    const handleNode2Press = () => {
        console.log("Node 2 Pressed");
        navigation.navigate('Node 2 Details');
    };

    const handleNode3Press = () => {
        console.log("Node 3 Pressed");
        navigation.navigate('Node 3 Details');
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Kumeu River Wines</Text>
            </View>

            <View style={styles.mapContainer}>
                <MapWithMarkers key={key} />
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

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
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
        // backgroundColor: "grey",
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