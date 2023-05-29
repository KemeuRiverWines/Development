import React, { useState } from 'react';
import { Text } from 'react-native';

const PostgresQuery = () => {
    const [data, setData] = useState('');

    const runQuery = async () => {
        try {
            const response = await fetch(
                'postgresql+psycopg2://postgres:postgres@74.235.0.187/kumeudb',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'text/plain',
                        'Content-Type': 'text/plain',
                    },
                    body:
                        "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'",
                }
            );
            const text = await response.text();
            setData(text);
        } catch (error) {
            console.error(error);
        }
    };

    runQuery();

    return <Text>{data}</Text>;
};

export default PostgresQuery;
