const API = 'http://localhost:8080/likes';

export const getLikes = async meme_id => {
  try {
    const res = await fetch(`${API}?meme_id=${meme_id}`);
    if (res.ok) {
      const likes = await res.json();
      return {
        ok: true,
        likes,
      };
    } else {
      return {
        ok: false,
        message: 'Failed to fetch likes!',
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

export const addLike = async like => {
  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(like),
    });

    const data = await response.json();
    if (data) {
      return {
        ok: true,
        data,
      };
    }
    return {
      ok: false,
      error: 'Failed to add like to meme',
    };
  } catch (error) {
    console.log('server error', error);
  }
};

export const deleteLike = async id => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok)
      return { ok: false, error: 'Failed to delete like!' };
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
