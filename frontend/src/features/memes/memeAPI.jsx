const API_URL = 'http://localhost:8080';

export const fetchMemes = async () => {
    try {
        const response = await fetch(`${API_URL}/memes`);
        return await response.json();
    } catch (err) {
        console.log('Error fetching memes:', err);
        return [];
    }
};

export const createMeme = async (memeData) => {
    try {
        const response = await fetch(`${API_URL}/memes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memeData),
        });
        return await response.json();
    } catch (err) {
        console.log('Error creating meme:', err);
        return { ok: false, message: 'Server error' };
    }
};
