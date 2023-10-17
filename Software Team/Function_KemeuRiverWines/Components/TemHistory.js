import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Table, Row } from 'react-native-table-component';

const History = () => {
  const data = {
    labels: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    datasets: [
      {
        data: [20, 22, 21, 25, 24, 23],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#efefef',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    bezier: true,
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
  };

  const tableHead = ['Date/Time', 'Temperature'];
  const tableData = [
    ['Mon/ 20:00', '20°C'],
    ['Mon/ 19:00', '21°C'],
    ['Mon/ 18:00', '21°C'],
    ['Mon/ 17:00', '22°C'],
    ['Mon/ 16:00', '22°C'],
    ['Mon/ 15:00', '22°C'],
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
              textStyle={styles.text}
            />
          ))}
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  chartContainer: {
    marginVertical: 20,
  },
  tableContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECED',
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  textHead: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    height: 40,
  },
  text: {
    textAlign: 'center',
    margin: 6,
  },
});

export default History;
