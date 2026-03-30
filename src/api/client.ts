import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.API_BASE_URL || 'http://localhost:8080/IGRP-Template';
    
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para autenticação se necessário
    this.client.interceptors.request.use((config) => {
      // Adicionar autenticação aqui se necessário
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}

export default new ApiClient().instance;
