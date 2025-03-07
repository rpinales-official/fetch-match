export const fetchDogsByIds = async (dogIds: string[]) => {    
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dogIds),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch dogs. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching dogs by IDs:', error);
        throw error;
    }
};