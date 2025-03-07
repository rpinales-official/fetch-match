const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const searchDogs = async (
    breeds: string[],
    zipCodes: string[]
) => {
    const queryParams: { [key: string]: string } = {
        breeds: breeds.join(','),
        zipCodes: zipCodes.join(','),
    };

    const queryString = new URLSearchParams(queryParams).toString();

    try {
        const response = await fetch(`${API_BASE_URL}/dogs/search?${queryString}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dog search results:', error);
        throw error;
    }
};

export const getAllDogs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dogs/search`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all dogs');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all dogs:', error);
        throw error;
    }
};