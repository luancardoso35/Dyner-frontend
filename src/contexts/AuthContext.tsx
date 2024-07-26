import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => {}
} as AuthContextValues)

interface AuthContextValues {
    user: User | null | undefined,
    setUser: Function
}

interface AuthContextProps {
    children: React.ReactNode
}

interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    avatarSeed: string,
}

export function AuthContextProvider({children} : AuthContextProps) {
    const [user, setUser] = useState<User | null | undefined>(null)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}