import API_URL from '../baseUrl';

const memeRequest = async creator_id => {
  try {
    const url = creator_id
      ? `${API_URL}/memes?creator_id=${creator_id}`
      : `${API_URL}/memes`;

    const response = await fetch(url);
    if (response.ok) {
      const memes = await response.json();
      return {
        ok: true,
        memes,
      };
    } else {
      return {
        ok: false,
        message: 'Failed to fetch memes',
      };
    }
  } catch (err) {
    console.log('mem request error: ', err);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};

export default memeRequest;
