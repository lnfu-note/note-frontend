import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const TOKEN_NAME = 'token';
const setAuthToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
}
const getAuthToken = () => {
    return localStorage.getItem(TOKEN_NAME);
}

const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) { // children 是 sub component
    const [token, setToken] = useState(() => getAuthToken())

    useEffect(() => {
        setAuthToken(token)
    }, [token])

    const login = (newToken) => {
        setToken(newToken)
    }
    const logout = () => {
        setToken('')
    }
    const isAuthenticated = () => {
        return token !== '' // 是否登入
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node
}
