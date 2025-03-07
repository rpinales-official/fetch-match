import React, { JSX, useEffect, useState } from 'react';

import { fetchDogBreeds } from '../services/breeds-api';
import { searchDogs, getAllDogs } from '../services/search-api';

import Search from './search';
import { Box, Typography, CircularProgress } from '@mui/material';

interface HomeScreenProps { };

function HomeScreen(props: HomeScreenProps): JSX.Element {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [zipCode, setZipCode] = useState<string>('');
    const [dogs, setDogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const handleZipcodeChange = (newZipcode: string) => {
        setZipCode(newZipcode);
    };

    const handleSearch = () => {
        setLoading(true);
        setError(null);

        const hasFilters = selectedBreeds.length > 0 || zipCode.trim() !== '';

        const searchFunction = hasFilters ? () => searchDogs(selectedBreeds, [zipCode]) :
            getAllDogs;

        searchFunction()
            .then((data) => {
                setDogs(data.resultIds);
                console.log(hasFilters ? 'Search results:' : 'All dogs:', data);
            })
            .catch(() => {
                setError(`Failed to fetch ${hasFilters ? 'dogs' : 'all dogs'}. Please try again later.`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box>
            <Search
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                onSelectChange={handleBreedChange}
                zipCode={zipCode}
                onZipcodeChange={handleZipcodeChange}
                onSearch={handleSearch} />
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Results</Typography>

                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <ul>
                        {dogs.map((dogId, index) => (
                            <li key={index}>{dogId}</li>
                        ))}
                    </ul>
                )}
            </Box>
        </Box>
    );
};

export default HomeScreen;