const API = 'http://localhost:8080/users';

export const getAllUsers = async () => {
  try {
    const response = await fetch(API);
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

export const banUser = async (banStatus, id) => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ isBanned: banStatus }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (e) {
    console.log('server error: ', e);
  }
};
