export const login = async (name: string, email: string) => {
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        // Check if the response has JSON content
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Usage Example:
// login('Roberto P', 'roberto.p@example.com')
//     .then((data) => {
//         console.log('data', data);  // Handle the response data
//     })
//     .catch((error) => {
//         console.log('Error:', error);  // Handle error
//     });