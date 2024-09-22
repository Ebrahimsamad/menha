export const fetchSavedScholarships = async (page = 1, limit = 3) => {
    try {
        console.log("page = " + page);
        console.log("limit = " + limit);
        
        const token = localStorage.getItem('token');
        console.log("token = " + token);

        
        const url = `https://menha-backend.vercel.app/saved-scholarship?page=${page}&&limit=${limit}`;

        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        
        if (!response.ok) {
            throw new Error('Failed to fetch scholarships');
        }
        
        
        const data = await response.json();
        console.log("data = " + JSON.stringify(data, null, 2));
        
        return data;

    } catch (error) {
        console.error("Error fetching saved scholarships:", error);
        
        return [];
    }
};
