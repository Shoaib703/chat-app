import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [accesstoken, setToken] = useState(() => localStorage.getItem('accessToken'))
    
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null  
    })
    
    const login = (newToken, userData) => {
        localStorage.setItem('accesstoken', newToken)
        localStorage.setItem('user', JSON.stringify(userData))
        setToken(newToken)
        setUser(userData)
       
    }

    const logout = () => {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ accesstoken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}