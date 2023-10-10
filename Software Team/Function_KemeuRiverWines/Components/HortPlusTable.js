import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';


const Component = ({ selectedDataType }) => {

	const [isLoading, setIsLoading] = useState(true);
	const [timestampData, setTimestampData] = useState([]);
	const [temperatureData, setTemperatureData] = useState([]);
	const [rainfallData, setRainfallData] = useState([]);
	const [humidityData, setHumidityData] = useState([]);
	const [leafWetnessData, setLeafWetnessData] = useState([]);
	const [windSpeedData, setWindSpeedData] = useState([]);
	const [dewPointData, setDewPointData] = useState([]);

	useEffect(() => {
		const now = new Date();
		now.setHours(now.getHours() + 12);
		const fourDaysAgo = new Date(now.getTime());
		fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
		fourDaysAgo.setHours(fourDaysAgo.getHours() + 12);

		const start = fourDaysAgo.toISOString().slice(0, -10) + "00:00";
		const stop = now.toISOString().slice(0, -10) + "00:00";

		const url = `http://api.metwatch.nz/api/legacy/weather/hourly?station=KMU&start=${start}&stop=${stop}`;
		console.log(url);

		fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'x-api-key': 'iWe1rParl8d226JqFJeM0ZpZcKfl6rbvmdtKay2TCOW8NHSKGefEpF0HsAQ0OTKBuZtAAB0xLOlw93Q2'
			}
		})
			.then((response) => response.json())
			.then((json) => {
				//Process Time Data
				const convertedTimestamps = json.SDATA.map(timestamp => new Date(timestamp * 1000));
				setTimestampData(convertedTimestamps);

				//Process Temperature Data
				const convertedTemperatureData = json.TDDATA.map(temp => parseFloat(temp));
				setTemperatureData(convertedTemperatureData);

				//Process Rainfall Data
				const convertedRainfallData = json.RNDATA.map(data => parseFloat(data));
				setRainfallData(convertedRainfallData);

				//Process Humidity Data
				const convertedHumidityData = json.RHDATA.map(data => parseFloat(data));
				setHumidityData(convertedHumidityData);

				//Process Leaf Wetness Data
				const convertedLeafWetnessData = json.LSDATA.map(data => parseFloat(data));
				setLeafWetnessData(convertedLeafWetnessData);

				//Process Wind Speed Data
				const convertedWindSpeedData = json.WSDATA.map(data => parseFloat(data));
				setWindSpeedData(convertedWindSpeedData);

				//Process Dew Point Data
				const convertedDewPointData = json.DPDATA.map(data => parseFloat(data));
				setDewPointData(convertedDewPointData);

				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, []);

	if (isLoading) {
		return (
			<View>
				<Text>Loading Table...</Text>
			</View>
		);
	}

	let dataToDisplay;
	switch (selectedDataType) {
		case 'TDDATA':
			dataToDisplay = temperatureData;
			textToDisplay = 'Temperature Data';
			valueType = 'Temperature (°C)'
			break;
		case 'RHDATA':
			dataToDisplay = humidityData;
			textToDisplay = 'Humidity Data';
			valueType = 'Humidity (%)'
			break;
		case 'DPDATA':
			dataToDisplay = dewPointData;
			textToDisplay = 'Dew Point Data';
			valueType = 'Dew Point (°C)'
			break;
		case 'WSDATA':
			dataToDisplay = windSpeedData;
			textToDisplay = 'Wind Speed Data';
			valueType = 'Wind Speed (km/h)'
			break;
		case 'LSDATA':
			dataToDisplay = leafWetnessData;
			textToDisplay = 'Leaf Wetness Data';
			valueType = 'Leaf Wetness (arb)'
			break;
		case 'RNDATA':
			dataToDisplay = rainfallData;
			textToDisplay = 'Rainfall Data';
			valueType = 'Rainfall (mm)'
			break;
	}

	return (
		<View>
			<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
				<Row data={['Timestamp', valueType]} style={styles.head} textStyle={styles.text} />
				{
					timestampData.slice().reverse().map((timestamp, index) => (
						<Row key={index} data={[timestamp.toLocaleString(), dataToDisplay.slice().reverse()[index]]} textStyle={styles.text} />
					))
				}
			</Table>
		</View>
	)
};

const styles = StyleSheet.create({
	head: { height: 40, backgroundColor: '#f1f8ff' },
	text: { margin: 6 }
});

export default Component;