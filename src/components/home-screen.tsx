import React, { JSX, useEffect, useState, Fragment } from 'react';

import { fetchDogBreeds } from '../services/breeds-api';
import { searchDogs, getAllDogs } from '../services/search-api';
import { fetchDogsByIds } from '../services/dogs-api';
import { matchDogs } from '../services/match-api';

import { Box, Typography, Button } from '@mui/material';
import Search from './search';
import Results from './results';
import DogCard from './dog-card';

interface HomeScreenProps { };

function HomeScreen(props: HomeScreenProps): JSX.Element {
    const { } = props;

    const [breeds, setBreeds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [zipCode, setZipCode] = useState<string>('');
    const [dogIds, setDogIds] = useState<string[]>([]);
    const [dogs, setDogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);
    const [matchedDogId, setMatchedDogId] = useState<string | null>(null);

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

        const searchFunction = hasFilters ? () => searchDogs(selectedBreeds, [zipCode]) : getAllDogs;

        searchFunction()
            .then((data) => {
                if (!data.resultIds || data.resultIds.length === 0) {
                    setDogs([]);
                    setDogIds([]);
                    return Promise.reject('No dogs found.');
                }
                setDogIds(data.resultIds);
                return fetchDogsByIds(data.resultIds);
            })
            .then((dogDetails) => {
                setDogs(dogDetails);
            })
            .catch((error) => {
                console.error(error);
                setError(`Failed to fetch ${hasFilters ? 'dogs' : 'all dogs'}. Please try again later.`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddRemoveDog = (dogId: string) => {
        setSelectedDogIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(dogId)) {
                return prevSelectedIds.filter((id) => id !== dogId);
            } else {
                return [...prevSelectedIds, dogId];
            }
        });
    };

    const handleMatchDogs = () => {
        if (selectedDogIds.length === 0) {
            setError('Please select at least one dog to match.');
            return;
        }

        setLoading(true);
        setError(null);

        matchDogs(selectedDogIds)
            .then((data) => {
                setMatchedDogId(data.match);
            })
            .catch(() => {
                setError('Failed to match dogs. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const matchedDog = dogs.find((dog) => dog.id === matchedDogId);

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
            {dogs.length > 0 &&
                <Box sx={styles.matchContainer}>
                    <Button variant="contained" onClick={handleMatchDogs} disabled={loading}>
                        Get a match
                    </Button>
                    {matchedDog &&
                        <Fragment>
                            <h1>Your Match!</h1>
                            <DogCard
                                key={matchedDog.id}
                                img={matchedDog.img}
                                name={matchedDog.name}
                                age={matchedDog.age}
                                zipCode={matchedDog.zip_code}
                                breed={matchedDog.breed}
                                onAddRemove={() => handleAddRemoveDog(matchedDog.id)}
                                isSelected={selectedDogIds.includes(matchedDog.id)} />
                        </Fragment>
                    }
                </Box>}
            <Results
                dogs={dogs}
                loading={loading}
                handleAddRemoveDog={handleAddRemoveDog}
                selectedDogIds={selectedDogIds} />
        </Box>
    );
};

const styles = {
    matchContainer: {
        mt: 2,
    }
};

export default HomeScreen;