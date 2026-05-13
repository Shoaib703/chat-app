import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    
    
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null  
    })
    
    const login = ( userData) => {
        
        setUser(userData)
       
    }

    const logout = async () => {
     
                await fetch('http://localhost:8000/api/v2/users/logout', {
            method: 'POST',
            credentials: 'include' 
        })


        localStorage.removeItem('user')
        settUser(null);
  
      
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}