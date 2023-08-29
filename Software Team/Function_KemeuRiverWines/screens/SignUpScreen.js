import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://172.20.10.5:3000/register', {
        username,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <ImageBackground source={require('../assets/Images/Background.jpg')} style={styles.imageBackground}>
      <View style={styles.overlay}>
        <Image source={require('../assets/Images/Logo.png')} style={styles.logo} />
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} color="#FFBB01"/>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
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
  buttonContainer: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
});

export default Register;
