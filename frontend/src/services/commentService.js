const API = 'http://localhost:8080/comments';

// GET
export const getComments = async meme_id => {
  try {
    const response = await fetch(`${API}?meme_id=${meme_id}`);
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

// DELETE
export const deleteComment = async id => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok)
      return { ok: false, message: 'Failed to delete comment!' };
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

// UPDATE
export const editComment = async ({ id, comment }) => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      return {
        ok: false,
        message: 'Failed to update comment',
      };
    }
    return await response.json();
  } catch (error) {
    console.log('Server error: ', error);
  }
};
