export  const fetchDogBreeds = async () => {
    const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
  
    const data = await response.json();
    return data;
  }