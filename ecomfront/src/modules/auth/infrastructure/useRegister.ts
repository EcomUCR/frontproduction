import { useState } from 'react';
import axios from 'axios';

export type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  type: string;
};

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Error al registrarse");
      throw err;
    }
  };

  return { register, loading, error };
}