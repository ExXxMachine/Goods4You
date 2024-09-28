const TOKEN_KEY = 'auth_token'

export const setToken = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
	return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY)
}

// src/features/tokenService.ts

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true; // Если токен отсутствует, считается истекшим

    const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем JWT
    const expirationTime = payload.exp * 1000; // Время истечения в миллисекундах
    return Date.now() >= expirationTime; // Проверяем, истек ли токен
};
