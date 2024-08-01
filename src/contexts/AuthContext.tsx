'use client'
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";

interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    avatarSeed: string,
    friends: User[],
    createdAt: Date,
    requestsSent: any[],
    requestsReceived: any[],
}
interface AuthContextValues {
    user: User | null,
    handleChangeUser: (userId: string) => void,
    user_jwt: string,
    decodeJwt: () => void,
    updateUserWithNewFriend: (user: User) => void,
}

const jose = require("jose");

const UserContext = createContext<AuthContextValues>({} as AuthContextValues)

function AuthContextProvider({children} : {children: React.ReactNode}) {
    const [userHasChanged, setUserHasChanged] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const user_jwt = parseCookies()['dyner_auth_token']

    const decodeJwt = () => {
        jose.jwtVerify(user_jwt, new TextEncoder().encode(process.env.SECRET))
        .then(({payload}: any) => {
            handleChangeUser(payload.userId)
    })
    }

    const handleChangeUser = async(userId: string) => {
        if (!userHasChanged) {
            const { data } = await axios.get('http://localhost:3030/user/get-by-id', { params: {
                userId
            }})
            setUser(data.data);
            setUserHasChanged(true)
        }
    }

    const updateUserWithNewFriend = (user: User) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, handleChangeUser, user_jwt, decodeJwt, updateUserWithNewFriend }}>
            {children}
        </UserContext.Provider>
    )
}

export { AuthContextProvider, UserContext }