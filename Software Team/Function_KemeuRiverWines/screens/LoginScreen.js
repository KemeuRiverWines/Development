import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.5:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 404) {
        throw new Error('Endpoint not found.');
      } else if (response.status === 500) {
        throw new Error('Server error.');
      }

      const data = await response.json();

      if (data.success) {
        // Login successful, navigate to HomeScreen
        navigation.navigate('TemperatureScreen');
      } else {
        // Login failed, display error message
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "There was an issue with the request. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ImageBackground source={require('../assets/Images/Background.jpg')} style={styles.container}>
      <View style={styles.overlay}>
      <Image source={require('../assets/Images/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
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
  loginButton: {
    backgroundColor: '#FFBB01',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#E0E6EE',
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
  forgotPasswordText: {
    color: '#4756DF',
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});

export default LoginScreen;