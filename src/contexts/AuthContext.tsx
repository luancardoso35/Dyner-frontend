'use client'
import { createContext, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    decodeJwt: () => void,
    updateUserWithNewFriend: (user: User) => void,
    handleLogout: () => void,
}

const jose = require("jose");

const UserContext = createContext<AuthContextValues>({} as AuthContextValues)

function AuthContextProvider({children} : {children: React.ReactNode}) {
    const router = useRouter()
    const [userHasChanged, setUserHasChanged] = useState(false)
    const [user, setUser] = useState<User | null>(null);

    const decodeJwt = () => {
        const user_jwt = parseCookies()['dyner_auth_token']
        if (user_jwt) {
            jose.jwtVerify(user_jwt, new TextEncoder().encode(process.env.SECRET))
            .then(({payload}: any) => {
                handleChangeUser(payload.userId)
            })
        }
    }

    const handleChangeUser = async(userId: string) => {
        if (!userHasChanged) {
        const { data } = await axios.get(`${process.env.BASE_URL}/user/get-by-id`, { params: {
                userId
            }})
            setUser(data.data);
            setUserHasChanged(true)
        }
    }

    const handleLogout = () => {
        router.push('/sign-in')
        setUserHasChanged(false)
        setUser(null)
        destroyCookie(null, 'dyner_auth_token')
    }

    const updateUserWithNewFriend = (user: User) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ user, handleChangeUser, decodeJwt, updateUserWithNewFriend, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export { AuthContextProvider, UserContext }