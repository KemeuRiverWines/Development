import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const Component = ({ onFetch }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://115.188.10.251:3000/api/forecast/data/all/allforecast')
            .then(response => response.json())
            .then(data => {
                setData(data);
                onFetch(data);
                // console.log(data);
            })
            .catch(error => console.error(error));
    }, []);

    return null;
};

export default Component;
