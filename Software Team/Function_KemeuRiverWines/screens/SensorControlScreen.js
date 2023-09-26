import React, {useState, useEffect } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios";

const MAX_VALUE_COUNT = 12; //Max values that can be send in a payload
const API_URL = "http://115.188.10.251:3000/api";
const MIN_SEND_MINUTE = 1; // Min send delay is 1 min
const MAX_SEND_MINUTE = 240; //Max Send delay is 4 hours

//TEMP TEMP SENSOR for testing
const tempSensor = {
    name: "temperature",
    delay: 1,
    count: 2
}



const SensorControlScreen = () => {
    const [sendDelay, setSendDalay] = useState(0);
    const [sendDelayBuffer, updateSendDelay] = useState(0);
    const [valueCount, setValueCount] = useState(0);
    const [sensors, setSensors] = useState([]);
    const [updatedSensor, updateSensors] = useState([]);

    const calcAndUpdateValueCount = () => {
         
    } 
    
    //RAN once on component build fetches information and updates to state
    useEffect(() => {
        fetchSensorData().then((sensorData) => {
            setSensors(sensorData);
            updateSensors(sensorData);
        });
    },[]);
    

    const updateSensor = (sensorIndex, delay, count) => {
        const updatedArray = updatedSensor.map((value, index) => {
            if(index == sensorIndex) {
                return({...value, count: count, delay: delay});
            } else {
                return value;
            }
        });
        updateSensors(updatedArray);
    }

    //Functions is used to fetch the data from the API for current node information
    //Returns an array of sensor json payloads
    //INDEX 0 OF ARRAY IS ALWAYS LoRa Send delay
    const fetchSensorData = async () => {
	try {
		const res = await axios.get(`${API_URL}/node/info`);
		if("state" in res.data) {
			//Pop index 0 off array and store into send Delay
			const delay = res.data.state.shift();
			setSendDalay(delay);
			return res.data.state;
		}
	} catch(err) {
		console.log("CANNOT CONNECT TO API");
        console.log(err);
	}
    }

    const RenderSensorControl = () => {
        if(updatedSensor != null) {
            return (
                <ScrollView>
                    {updatedSensor.map((value, index) => {
                        return (<SensorControlComponenet key={value.key} index={index} name={value.name} delay={value.delay} count={value.count} updateInfo={updateSensor} />);
                    })}
                </ScrollView>
            );
        } else {
            return (<View></View>);
        }
   }

    const sendAndUpdateInfo = async () => {
        //SENDING INFORMATION
        setSendDalay(sendDelayBuffer); 
        setSensors(updatedSensor);

        //Now we take the actual values and send to the api
        const payloadData = {
            loraSend: sendDelay,
            nodeInfo: updatedSensor
        };

        console.log("SENDING");
        console.log(payloadData);

        try {
            const res = await axios.post(`${API_URL}/node/update`, {
                data: payloadData
            });
            console.log("Data sent");
            console.log(res);
        } catch(err) {
            console.log(err);
        }
   };


  return(
      <View>
        <View> 
            <Text>Sending Values: {valueCount}/{MAX_VALUE_COUNT}</Text>

        </View>

        <View>
            <Text>Current send delay: {sendDelay}</Text> 
            <TextInput 
                onChangeText={updateSendDelay} 
                keyboardType="numeric"
                value={sendDelayBuffer}
            />
            <Button
                title={"Update Send Delay"}
                onPress={() => setSendDalay(sendDelayBuffer)}
            />
        </View>

        <View>
            <Button
                title={"Send Update"}
                onPress={sendAndUpdateInfo}
            />
        </View>

        <RenderSensorControl />
      </View>
    );
}

export default SensorControlScreen


/** I'VE DONE NO ERROR HANDLING SO MIGHT WANT TO ADD SOME
 * - WOULD CHECK THE VALUE THAT IS PASSED INTO UPDATE FUNCTIONS 
 */
//Props to be passed
//name -- String
//delay -- int
//count -- int
//updateDelay -- function
//updateCount -- function
const SensorControlComponenet = (props) => {
    const[name, setName] = useState(props.name);
    const[delay, setDelay] = useState(props.delay);
    const[count, setCount] = useState(props.count);
    const[delayBuffer, setDelayBuffer] = useState(0);
    const[countbuffer, setCountBuffer] = useState(0);

    useEffect(() => {
        setDelay(props.delay);
        setCount(props.count);
    }, [])
    


    const updateDelay = (value) => {
        if(value >= 0) {
            setDelayBuffer(value); 
        }
    } 

    const updateCount = (value) => {
        if(value >= 0) {
            setCountBuffer(value);
        }
    }

    //Updates sensor to array
    const updateSensor = () => {
        if((delayBuffer >= 0 && countbuffer >= 0) && (countbuffer != "" && delayBuffer != "")) {
            console.log("BUF " + countbuffer);
            props.updateInfo(props.index, delayBuffer, countbuffer);
        }
    }

    return(
        <View>
            <Text>{name}</Text>

            <Text>Delay: {delay}</Text>
            <TextInput
                onChangeText={updateDelay} 
                keyboardType="numeric"
                value={delayBuffer}
            />

            <Text>Count: {count}</Text>
            <TextInput
                onChangeText={updateCount} 
                keyboardType="numeric"
                value={countbuffer}
            />
            <Button onPress={updateSensor} title={`Update ${name}`}/>
        </View>
    );
};
