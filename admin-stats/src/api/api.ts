import axios from 'axios';
import { getCookie } from '../scenes/utils/csrf';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});

// Get CSRF token (called once on app load or before login)
export const getCsrfToken = async () => {
  try {
    await api.get('csrf/');
    console.log('CSRF cookie set');
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Login API function
export const loginUser = async (acc_username: string, acc_password: string) => {
  const csrfToken = getCookie('csrftoken');
  const formattedPassword = new Date(acc_password).toISOString().split('T')[0];

  try {
    const response = await api.post(
      'login/',
      { acc_username, acc_password: formattedPassword },
      {
        headers: {
          'X-CSRFToken': csrfToken || '',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default api;
