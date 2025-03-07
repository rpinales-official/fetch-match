import React, { JSX } from 'react';

import { Box, CircularProgress } from '@mui/material';
import DogCard from './dog-card';

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface ResultsProps {
    dogs: Dog[];
    loading: boolean;
}

function Results(props: ResultsProps): JSX.Element {
    const {
        dogs,
        loading,
    } = props;

    console.log("dogs", dogs);

    return (
        <Box>
            {loading && <CircularProgress />}
            <h1>Results Component</h1>
            {dogs.map((dog) => (
                <DogCard
                    key={dog.id}
                    img={dog.img}
                    name={dog.name}
                    age={dog.age}
                    zipCode={dog.zip_code}
                    breed={dog.breed}
                />
            ))}
        </Box>
    );
};

export default Results;