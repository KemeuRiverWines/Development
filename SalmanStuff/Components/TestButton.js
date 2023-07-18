import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ExampleComponent = () => {
    const [visible, setVisible] = useState(true);
    const buttonText = visible ? 'Hide text' : 'Show text';

    const handleButtonPress = () => {
        setVisible(!visible);
    };

    return (
        <View>
            {visible && <Text>This is a line of text likes to hide</Text>}
            <TouchableOpacity onPress={handleButtonPress}>
                <View style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    
};

export default ExampleComponent;
