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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  boxesContainer: {
    paddingBottom: 20,
  },
  box: {
    width: '100%',
    height: 100,
    backgroundColor: '#004E7C',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  info: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default History;
