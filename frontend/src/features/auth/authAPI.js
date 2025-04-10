const API_URL = 'http://localhost:8080';

export const loginRequest = async ({ username, password }) => {
  try {
    const response = await fetch(
        `${API_URL}/users?username=${username}&${password}`,
    );

    const users = await response.json();

    if (users.length > 0) {
      return {
        ok: true,
        user: users[0],
        token: 'fake-jwt-token' + users[0].id,
      };
    } else {
      return {
        ok: false,
        message: 'Invalid credentials',
      };
    }
  } catch (err) {
    console.log('catch error', err);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};

export const registerRequest = async ({ username, password }) => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      return { ok: true };
    }

    const data = await res.json();
    return {
      ok: false,
      message: data.message || 'Registration failed',
    };
  } catch (err) {
    console.log('catch error', err);
    return {
      ok: false,
      message: 'Server error',
    };
  }
};
