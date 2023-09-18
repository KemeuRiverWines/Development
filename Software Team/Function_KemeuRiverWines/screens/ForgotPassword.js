import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground, Image } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://192.168.1.90:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      Alert.alert("Success", "Password has been sent to your email!");
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "There was an issue with the request. Please try again.");
    }
  };

  return (
    <ImageBackground source={require('./assets/Images/Background.jpg')} style={styles.container}>
      <View style={styles.overlay}>
      <Image source={require('./assets/Images/Logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.bottomText}>Kumeu River made by AUT 2023</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E6EE',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FFBB01',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
  },
  bottomText: {
    fontSize: 14,
    color: '#000', 
  }
});

export default ForgotPasswordScreen;
