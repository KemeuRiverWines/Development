import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Swiper from 'react-native-swiper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

//import WeatherAirTemp from './Components/WeatherAirTemp';
import SensorComponent1 from './Components/SensorComponent1';

const TemperatureScreen = () => {

  //SensorComponent1 which is the first node - handles the incoming data from the node
  const [sensorData1, setSensorData1] = useState(null);
  const sensorComponent1Ref = useRef(null);
  const handleDataReceived1 = (latestData) => {
    setSensorData1(latestData);
  };
  // Below the the data from the node that can be displayed and how it is displayed
  // <SensorComponent1 ref={sensorComponent1Ref} onDataReceived={handleDataReceived1} />
  //           {sensorData1 && (
  //             <View>
  //               <Text>Sensor 1 Temp: {sensorData1.temperature}</Text>
  //               <Text>Sensor 1 Humidity: {sensorData1.humidity}</Text>
  //               <Text>Sensor 1 Dew Point: {sensorData1.dew_point}</Text>
  //               <Text>Sensor 1 Wind Speed: {sensorData1.wind_speed}</Text>
  //               <Text>Sensor 1 Leaf Wetness: {sensorData1.leaf_wetness}</Text>
  //               <Text>Sensor 1 Rainfall: {sensorData1.rainfall}</Text>
  //               <Text>Sensor 1 Time Stamp: {sensorData1.timestamp}</Text>
  //               <Text>Sensor 1 Last Update: {sensorData1.timeAgo}</Text>
  //             </View>

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
        <Text style={styles.headerText}>Kumeu River Vineyard</Text>
        <View style={styles.temperatureContainer}>
          <View style={styles.temperatureBackground}>
          <SensorComponent1 ref={sensorComponent1Ref} onDataReceived={handleDataReceived1} />
            {sensorData1 && (
              <View>
                <Text style={styles.temperature}>
                  {sensorData1.temperature !== null ? `${sensorData1.temperature}°C` : <ActivityIndicator size="large" />}
                </Text>
                <Text style={styles.timeAgo}>
                  {sensorData1.timeAgo !== null ? `${sensorData1.timeAgo}` : <ActivityIndicator size="small" />}
                </Text>
              </View>
            )}
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
                      <Text style={{ fontSize: 30 }}>Node1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}>
                      <Icon name="location" size={100} color="#900" />
                      <Text style={{ fontSize: 30 }}>Node2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}>
                      <Icon name="location" size={100} color="#900" />
                      <Text style={{ fontSize: 30 }}>Node3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.rectangle, { height: 150 }]}></TouchableOpacity>
                  </>
                )}
                {index === 1 && (
                  <>
                    <View style={[styles.rectangle, { height: 150 }]}>
                      <Text style={{ fontSize: 30 }}>Low Temp Alarm</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  timeAgo: {
    fontSize: 22,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
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
