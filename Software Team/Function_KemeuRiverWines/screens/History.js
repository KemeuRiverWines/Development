import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const History = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature History</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.boxesContainer}>
        {[1, 2, 3, 4, 5, 6].map((box) => (
          <View key={box} style={styles.box}>
            {box === 1 && (
              <>
                <Text style={styles.info}>Date: 2023-09-26</Text>
                <Text style={styles.info}>Time: 10:30 AM</Text>
                <Text style={styles.info}>Temperature: 25°C</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#004E7C',
  },
  scrollView: {
    flex: 1,
  },
  boxesContainer: {
    paddingBottom: 30,
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: '#004E7C',
    marginBottom: 30,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  info: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default History;
