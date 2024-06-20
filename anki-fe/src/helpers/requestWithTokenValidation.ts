import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { isAccessTokenValid } from './isAccessTokenValid'
import { isRefreshTokenValid } from './isRefreshTokenValid'
import { refreshTokens } from './refreshTokens'

const getAccessToken = (): string | null => {
  return localStorage.getItem('access')
}

// Создание экземпляра Axios с базовой конфигурацией
const api = axios.create({
  baseURL: 'http://localhost:3000', // Измените на ваш базовый URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// Добавление интерсептора для добавления токена к каждому запросу
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Функция-обертка для выполнения запросов
export const requestWithTokenValidation = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    let response

    // Проверяем валидность access токена
    if (await isAccessTokenValid()) {
      response = await api.request<T>(config)
      return response
    }

    // Если access токен не валиден, пробуем обновить токены
    await refreshTokens()

    // Повторно выполняем запрос с обновленным access токеном
    response = await api.request<T>(config)
    return response
  } catch (error) {
    console.error('Request error:', error)
    throw error
  }
}
