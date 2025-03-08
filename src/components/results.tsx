import React, { JSX } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';
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
    handleAddRemoveDog: (dogId: string) => void;
    selectedDogIds: string[];
}

function Results(props: ResultsProps): JSX.Element {
    const {
        dogs,
        loading,
        handleAddRemoveDog,
        selectedDogIds,
    } = props;

    return (
        <Box>
            {dogs.length > 0 &&
                <Typography variant="h4" fontWeight="bold">Available Dogs:</Typography>}
            {loading && <CircularProgress />}
            {dogs.map((dog) => (
                <DogCard
                    key={dog.id}
                    img={dog.img}
                    name={dog.name}
                    age={dog.age}
                    zipCode={dog.zip_code}
                    breed={dog.breed}
                    onAddRemove={() => handleAddRemoveDog(dog.id)}
                    isSelected={selectedDogIds.includes(dog.id)}
                />
            ))}
        </Box>
    );
};

export default Results;