import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Node1Forecast = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Node 1 Temperature Forecast</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.dataDisplay}>
                    <View style={styles.dataDisplayBox}>
                        <Text style={styles.dataDisplayText}>In 15 Minutes</Text>
                        <Text style={styles.dataDisplayValue}>22.02</Text>
                    </View>
                    <View style={styles.dataDisplayBox}>
                        <Text style={styles.dataDisplayText}>In 60 Minutes</Text>
                        <Text style={styles.dataDisplayValue}>21.95</Text>
                    </View>
                    <View style={styles.dataDisplayBox}>
                        <Text style={styles.dataDisplayText}>In 120 Minutes</Text>
                        <Text style={styles.dataDisplayValue}>21.00</Text>
                    </View>
                </View>
                <View style={styles.graph}>
                    <Text style={styles.graphText}>Graph</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'rgba(0,78,124,1)',
        width: "95%",
        height: "7%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        // fontWeight: 'bold',
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    dataDisplay: {
        marginTop: "5%",
        flexDirection: 'row',
        width: "96%",
        height: "15%",
        backgroundColor: 'white',
    },
    dataDisplayBox: {
        width: "30%",
        margin: "1.5%",
        height: "100%",
        backgroundColor: 'rgba(0,78,124,1)',
        alignSelf: 'center',
        borderRadius: 30,
    },
    dataDisplayText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: "10%",
    },
    dataDisplayValue: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        marginTop: "10%",
    },
    graph: {
        width: "96%",
        height: "50%",
        marginTop: "10%",
        backgroundColor: 'green',
    },
    graphText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginTop: "10%",
    },
});

export default Node1Forecast;
