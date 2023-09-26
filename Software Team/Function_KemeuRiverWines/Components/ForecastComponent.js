import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const FetchDataComponent = ({ onData }) => {
    useEffect(() => {
        fetch('http://115.188.10.251:3000/api/data/all/allforecast')
            .then(response => response.json())
            .then(data => {
                const currentTime = new Date();
                const currentTimeUTC = new Date(
                    currentTime.getUTCFullYear(),
                    currentTime.getUTCMonth(),
                    currentTime.getUTCDate(),
                    currentTime.getUTCHours(),
                    currentTime.getUTCMinutes(),
                    currentTime.getUTCSeconds()
                );
                const filteredData = data.filter(
                    forecast => new Date(forecast.timestamp) >= currentTimeUTC
                );
                const formattedData = filteredData.map(forecast => ({
                    ...forecast,
                    temperature: parseFloat(forecast.temperature.toFixed(2)),
                }));
                // console.log(formattedData);
                onData(formattedData);
            })
            .catch(error => console.error(error));
    }, []);

    return null;
};

FetchDataComponent.propTypes = {
    onData: PropTypes.func.isRequired,
};

export default FetchDataComponent;
