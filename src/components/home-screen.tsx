import React, { JSX, useEffect, useState } from 'react';

import { fetchDogBreeds } from '../services/breeds-api';

interface HomeScreenProps {
};

function HomeScreen(props: HomeScreenProps): JSX.Element {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDogBreeds()
            .then((data) => {
                console.log('Breeds:', data);
                setBreeds(data);
            })
            .catch((error) => {
                console.error('Error fetching breeds:', error);
                setError('Failed to load breeds. Please try again later.');
            });
    }, []);

    return (
        <div>
            <h1>Home Screen</h1>
        </div>
    );
};

export default HomeScreen;