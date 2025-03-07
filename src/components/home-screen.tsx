import React, { JSX, useEffect, useState } from 'react';

import { fetchDogBreeds } from '../services/breeds-api';

import Search from './search';
import { Box } from '@mui/material';

interface HomeScreenProps { };

function HomeScreen(props: HomeScreenProps): JSX.Element {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

    useEffect(() => {
        fetchDogBreeds()
            .then((data) => {
                setBreeds(data);
            })
            .catch((error) => {
                console.error('Error fetching breeds:', error);
                setError('Failed to load breeds. Please try again later.');
            });
    }, []);

    const handleBreedChange = (selected: string[]) => {
        setSelectedBreeds(selected);
    };

    return (
        <Box>
            <Search
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                onSelectChange={handleBreedChange}
            />
        </Box>
    );
};

export default HomeScreen;