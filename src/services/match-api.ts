const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

interface MatchResponse {
    match: string;
}

export const matchDogs = async (dogIds: string[]): Promise<MatchResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/dogs/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dogIds),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch match');
        }

        const data: MatchResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error matching dogs:', error);
        throw error;
    }
};