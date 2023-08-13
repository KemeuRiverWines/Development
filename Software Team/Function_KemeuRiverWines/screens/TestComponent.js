import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

const HelloWorldScreen = (props) => {
    const navigation = useNavigation();
    
    //Function for moving to settings screen
    const handleSettings = () => {
        console.log("Button is clicked");
        navigation.navigate('Node Control');
    };

    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <Button>Settings</Button>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HelloWorldScreen;
