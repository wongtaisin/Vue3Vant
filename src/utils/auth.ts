import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const login_user_key = 'key'

export const getToken = () => {
	return Cookies.get(TokenKey)
}

export const setToken = (token: any) => {
	return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
	return Cookies.remove(TokenKey)
}

export const loginUserKey = () => {
	return Cookies.get(login_user_key)
}

export const setloginUserKey = (keyv: any) => {
	return Cookies.set(login_user_key, keyv)
}

export const removeloginUserKey = () => {
	return Cookies.remove(login_user_key)
}
