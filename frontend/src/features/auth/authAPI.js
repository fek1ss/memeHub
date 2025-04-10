<<<<<<< HEAD
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

import bcrypt from 'bcryptjs';
import API_URL from '../baseUrl';
=======
const API_URL = 'http://localhost:8080';
>>>>>>> origin/main

export const loginRequest = async ({ username, password }) => {
  try {
    const response = await fetch(
<<<<<<< HEAD
      `${API_URL}/users?username=${username}`,
=======
        `${API_URL}/users?username=${username}&${password}`,
>>>>>>> origin/main
    );
    const users = await response.json();

    if (users.length === 0) {
      return { ok: false, message: 'User not found' };
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      return { ok: false, message: 'Invalid password' };
    }

    return {
      ok: true,
      user,
      token: 'fake-jwt-token-' + user.id,
    };
  } catch (err) {
    console.error('Login error:', err);
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
