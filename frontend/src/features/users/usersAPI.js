import BASE_API from '../baseUrl';

const usersRequest = async () => {
  try {
    const response = await fetch(`${BASE_API}/users`);
    if (response.ok) {
      const users = await response.json();
      return {
        ok: true,
        users,
      };
    } else {
      return {
        ok: false,
        message: 'Failed to fetch users',
      };
    }
  } catch (err) {
    console.log('users request error: ', err);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};

export default usersRequest;
