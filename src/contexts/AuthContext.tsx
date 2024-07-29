'use client'
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { parseCookies } from "nookies";

interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    avatarSeed: string,
}
interface AuthContextValues {
    user: User | null,
    handleChangeUser: (user: User) => void,
    user_jwt: string
}

const UserContext = createContext<AuthContextValues>({} as AuthContextValues)

function AuthContextProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    const handleChangeUser = (user: User) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, handleChangeUser, user_jwt: parseCookies()['dyner_auth_token']}}>
            {children}
        </UserContext.Provider>
    )
}

export { AuthContextProvider, UserContext }