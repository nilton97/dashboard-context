import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * API Gateway - Proxy para APIs do projeto COFRE/IGRP
 * CONEXÃO DIRETA - SEM dados mockados
 * Todas as requisições passam por este gateway que faz proxy para o backend IGRP
 */
class ApiGateway {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    // URL base do servidor IGRP
    this.baseURL = process.env.API_BASE_URL || 'http://localhost:8080/IGRP-Template';
    
    console.log(`[API Gateway] Inicializando gateway com backend: ${this.baseURL}`);
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Interceptor para logging e tratamento de erros
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API Gateway] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API Gateway] Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API Gateway] Response ${response.status} from ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[API Gateway] Response Error:', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
          backend: this.baseURL
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Faz proxy para endpoint do IGRP
   * CONEXÃO DIRETA - SEM fallback para dados mockados
   * 
   * IMPORTANTE: O path deve começar com /api/rh/ para corresponder às rotas do IGRP
   */
  async proxy(path: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<any> {
    try {
      // Garante que o path começa com /api/rh/
      const fullPath = path.startsWith('/api/rh/') ? path : `/api/rh${path}`;
      const fullUrl = `${this.baseURL}${fullPath}`;
      
      console.log(`[API Gateway] Proxying: ${fullUrl}`, params || '');
      
      const response = await this.client.get(fullPath, {
        params,
        ...config,
      });
      
      // Se a resposta for uma string JSON, faz parse
      if (typeof response.data === 'string') {
        try {
          const parsed = JSON.parse(response.data);
          console.log(`[API Gateway] Successfully parsed JSON response`);
          return parsed;
        } catch (e) {
          console.warn(`[API Gateway] Response is not valid JSON, returning as string`);
          return response.data;
        }
      }
      
      return response.data;
    } catch (error: any) {
      const fullUrl = `${this.baseURL}${path.startsWith('/api/rh/') ? path : `/api/rh${path}`}`;
      
      console.error(`[API Gateway] Error proxying ${path}:`, {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        backend: this.baseURL,
        fullUrl: fullUrl
      });
      
      // Retorna erro formatado - SEM fallback para mock
      const errorResponse: any = {
        message: error.message || 'Erro ao conectar com o backend',
        status: error.response?.status || 500,
        code: error.code,
        path: path,
        backend: this.baseURL,
        fullUrl: fullUrl
      };
      
      // Adiciona informações adicionais se disponíveis
      if (error.response?.data) {
        errorResponse.responseData = error.response.data;
      }
      
      throw errorResponse;
    }
  }

  /**
   * Health check do gateway
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/gateway/health', { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      console.warn('[API Gateway] Health check failed:', error);
      return false;
    }
  }

  /**
   * Obtém informações do gateway
   */
  async getGatewayInfo(): Promise<any> {
    try {
      const response = await this.client.get('/api/gateway/info');
      return response.data;
    } catch (error) {
      console.warn('[API Gateway] Gateway info not available');
      return null;
    }
  }
}

export default new ApiGateway();
