import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Swiper from 'react-native-swiper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { encode } from 'base-64';


const TemperatureScreen = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          const currentDate = new Date();

          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
          const day = currentDate.getDate().toString().padStart(2, '0');
          const hours = currentDate.getHours().toString().padStart(2, '0');
          const minutes = (currentDate.getMinutes()).toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          const formattedTime = `${hours}:${minutes}:00.000`;

          const url = `https://api.meteomatics.com/${formattedDate}T${formattedTime}+12:00/t_2m:C/-36.852095,174.7631803/json?model=mix`;
          const username = 'aucklanduniversityoftechnology_ali';
          const password = 'i4b8tLSu6A';

          
          try {
              const encodedCredentials = encode(`${username}:${password}`);
              const response = await axios.get(url, {
                  headers: {
                      Authorization: `Basic ${encodedCredentials}`,
                  },
              });
              
              const temperature = response.data.data[0].coordinates[0].dates[0].value;
              setTemperature(temperature);
              
              console.log(`Weather Air Temp Successful (Meteomatics Weather API) = ${url}`);
          } catch (error) {
              console.error('API Error:', error);
          }
      };

      fetchData();
  }, []);

  const navigation = useNavigation();
  const categoryOptions = ['Nodes', 'Functions', 'Map'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const swiperRef = useRef(null);
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleNode1Press = () => {
    navigation.navigate('WeatherPage');
  };

  const handleCategoryChange = (index) => {
    swiperRef.current?.scrollTo(index, true);
  };

  const handlePageChange = (index) => {
    setSelectedCategoryIndex(index);
  };

  useEffect(() => {
    setSelectedCategoryIndex(swiperRef.current?.state.index || 0);
  }, []);

  const renderCategoryOption = (option, index) => {
    const isSelected = index === selectedCategoryIndex;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          isSelected && styles.selectedOptionButton,
        ]}
        onPress={() => handleCategoryChange(index)}
      >
        <Text style={[styles.optionButtonText, isSelected && styles.selectedOptionButtonText]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleSwitch = () => {
    setSwitchOn((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Kumeu River Vineyard Temp</Text>
        <View style={styles.temperatureContainer}>
          <View style={styles.temperatureBackground}>
            <Text style={styles.temperature}>
              {temperature !== null ? `${temperature}°C` : 'Loading...'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.optionBar}>
        <View style={styles.optionBarContent}>
          {categoryOptions.map(renderCategoryOption)}
        </View>
      </View>
      <ScrollView>
        <View style={styles.bottomContainer}>
          <Swiper
            ref={swiperRef}
            loop={false}
            showsPagination={false}
            index={selectedCategoryIndex}
            onIndexChanged={handlePageChange}
          >
            {categoryOptions.map((option, index) => (
              <View style={styles.slide} key={index}>
                {index === 0 && (
                  <>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]} onPress={handleNode1Press}>
                      <Icon name="location" size={100} color="#900" />
                      <Text style={{fontSize: 30}}>Node1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}>
                      <Icon name="location" size={100} color="#900" />
                      <Text style={{fontSize: 30}}>Node2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}>
                      <Icon name="location" size={100} color="#900" />
                      <Text style={{fontSize: 30}}>Node3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                  </>
                )}
                {index === 1 && (
                  <>
                    <View style={[styles.rectangle, { height: 150 }]}>
                      <Text style={{fontSize: 30}}>Low Temp Alarm</Text>
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isSwitchOn}
                      />
                    </View>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                  </>
                )}
                {index === 2 && (
                  <>
                    <View style={[styles.rectangle, { height: 350 }]}>
                      <MapView style={styles.map} initialRegion={{
                        latitude: -36.778051,
                        longitude: 174.563803,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}>
                        <Marker coordinate={{ latitude: -36.778051, longitude: 174.563803 }} />
                      </MapView>
                    </View>
                  </>
                )}
              </View>
            ))}
          </Swiper>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004E7C',
    paddingVertical: 48,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  temperatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  temperatureBackground: {
    backgroundColor: '#004E7C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  temperature: {
    fontSize: 120,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  optionBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#8D8D8D',
    backgroundColor: '#004E7C',
  },
  optionBarContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedOptionButton: {},
  optionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  selectedOptionButtonText: {
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    paddingBottom: 16,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    paddingVertical: 16,
  },
  rectangle: {
    width: 350,
    backgroundColor: '#CCCCCC',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default TemperatureScreen;
