// // src/features/auth/authAPI.js

// const API_BASE = 'http://localhost:8080/api';

// export const loginRequest = async (credentials) => {
//   const res = await fetch(`${API_BASE}/sign-in`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials),
//   });
//   return await res.json();
// };

// export const registerRequest = async (userData) => {
//   const res = await fetch(`${API_BASE}/sign-up`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData),
//   });
//   return await res.json();
// };
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
