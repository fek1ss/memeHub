const API = 'http://localhost:8080/comments';

// GET
export const getAllComments = async meme_id => {
  try {
    const url = meme_id ? `${API}?meme_id=${meme_id}` : `${API}`;
    const response = await fetch(url);
    if (response.ok) {
      const comments = await response.json();
      return {
        ok: true,
        comments,
      };
    } else {
      return {
        ok: false,
        message: 'Failed to fetch comments!',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};

// POST
export const addComment = async comment => {
  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      return {
        ok: false,
        message: 'Failed to add comment',
      };
    }
    return {
      ok: true,
      message: 'comment added successfuly!',
    };
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
