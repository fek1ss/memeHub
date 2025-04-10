// src/features/memes/MemeForm.jsx

import { useState } from 'react';
import { createMeme } from './memeAPI';

const MemeForm = ({ onMemeCreated }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMeme = { title, image_url: imageUrl, created_at: new Date().toISOString() };
        const response = await createMeme(newMeme);

        if (response.ok) {
            onMemeCreated();
            setTitle('');
            setImageUrl('');
        } else {
            alert('Error creating meme');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Meme title"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
            />
            <button type="submit">Create Meme</button>
        </form>
    );
};

export default MemeForm;
