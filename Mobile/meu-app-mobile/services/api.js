import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL
  || (Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000');

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Não foi possível concluir a operação');
  return data;
}

export const login = (email, password) => request('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});

export const register = (payload) => request('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const verifyEmail = (email, code) => request('/api/auth/verify', {
  method: 'POST',
  body: JSON.stringify({ email, code }),
});

export const listCourses = () => request('/api/courses');

export const listComplaints = (token) => request('/api/complaints', {
  headers: { Authorization: `Bearer ${token}` },
});

export const createComplaint = (token, payload) => request('/api/complaints', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify(payload),
});