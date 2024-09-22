

export const removeSavedScholarship = async (scholarshipId) => {
    const token = localStorage.getItem('token'); 
    
   
    const response = await fetch('https://menha-backend.vercel.app/saved-scholarship', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ scholarshipId }) 
    });
    
    
    if (!response.ok) {
        
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove scholarship');
    }
    
    return await response.json(); 
};
