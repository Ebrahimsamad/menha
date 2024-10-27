const API_URL = 'https://menha-backend.vercel.app';

export const postPortfolio = async (FinalCombinedData, token) => {
  try {
    console.log("this is from post servive /////",FinalCombinedData)
    const response = await fetch(`${API_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
       
      },
      body:FinalCombinedData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add new portfolio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding new portfolio:', error);
    throw error;
  }
};
