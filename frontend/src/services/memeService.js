const API = 'http://localhost:8080/memes';

// GET
export const getAllMemes = async creator_id => {
  try {
    const url = creator_id
      ? `${API}?creator_id=${creator_id}`
      : `${API}`;

    const res = await fetch(url);

    if (res.ok) {
      const memes = await res.json();
      return {
        ok: true,
        memes,
      };
    } else {
      return {
        ok: false,
        message: 'Failed to fetch memes!',
      };
    }
  } catch (error) {
    console.error('Service error:', error);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};

// POST
export const createMeme = async meme => {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meme),
    });

    if (!res.ok) {
      return {
        ok: false,
        message: 'Failed to add meme!',
      };
    }
    return {
      ok: true,
      message: 'meme added successfully!',
    };
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
// UPDATE
export const updateMeme = async (id, meme) => {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meme),
    });
    if (!res.ok) throw new Error('Failed to update meme!');
    return await res.json();
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
// DELETE
export const deleteMeme = async id => {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete meme!');
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
