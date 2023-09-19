import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from '../assets/Images/Background.jpg';
import Logo from '../assets/Images/Logo.png';
import AUTLogo from '../assets/Images/AUTLogo.png';

const PinScreen = () => {
  const [pin, setPin] = useState('');
  const maxPinLength = 4;
  const navigation = useNavigation();

  const handlePress = (num) => {
    if (typeof num === 'number' && pin.length < maxPinLength) {
      setPin(pin + num);
    } else if (num === 'Forget PIN?') {
      navigation.navigate('ForgotPassword');
    } else if (num === 'delete') {
      handleDelete();
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPin('');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (pin.length === maxPinLength) {
      if (pin === '0000') {
        navigation.navigate('MapScreen');
      } else {
        Alert.alert('Incorrent PIN!');
        setPin('');
      }
    }
  }, [pin]);

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlay}>
      <Image source={AUTLogo} style={styles.logo} />
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Please Input PIN</Text>
      <View style={styles.pinContainer}>
        {Array.from({ length: maxPinLength }).map((_, idx) => (
          <View
            key={idx}
            style={[styles.pinDot, pin.length > idx ? styles.filledDot : null]}
          />
        ))}
      </View>
      <View style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Forget PIN?', 0, 'delete'].map((num) => (
          <TouchableOpacity
            key={num.toString()}
            style={styles.numberButton}
            onPress={() => handlePress(num)}
          >
            <Text style={styles.numberText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 30,
  },
  pinDot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  filledDot: {
    backgroundColor: 'black',
  },
  numberPad: {
    width: 250,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  numberButton: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
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
    resizeMode: 'contain',
  },
});

export default PinScreen;
