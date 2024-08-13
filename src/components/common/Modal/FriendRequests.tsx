import { createAvatar } from "@dicebear/core";
import { BaseModal } from "./BaseModal";
import { adventurer } from "@dicebear/collection";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/contexts/AuthContext";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatarSeed: string,
    createdAt: string,
}

interface FriendRequestProps {
    open: boolean,
    close: () => void,
    loggedUserId: string
}

export default function FriendRequest ({ open, close, loggedUserId }: FriendRequestProps) {
    const [friendsRequests, setFriendsRequests] = useState<User[]>([])
    const { updateUserWithNewFriend } = useContext(UserContext)

    useEffect(() => {
        if (loggedUserId) {
            queryFriendRequests()
        }

        async function queryFriendRequests() {
            try {
                const {data} = await axios.get('http://localhost:3030/request/', { params: {
                    userId: loggedUserId
                }})
                const response = await axios.get('http://localhost:3030/user/get-by-ids', { params: {
                    ids: data.data
                }})
                setFriendsRequests(response.data.data)
            } catch (error) {
                setFriendsRequests([])
            }
        }
    }, [loggedUserId])


    function generateAvatar(seed: string) {
        return createAvatar(adventurer, {
            size: 80,
            seed: seed
          }).toDataUri();
    }

    async function handleRequest(userId: string, accepted: boolean) {
        const {data} = await axios.post('http://localhost:3030/request/handle-request-change', {
            receiverId: loggedUserId,
            senderId: userId,
            accepted
        })

        if (data.success && accepted) {
            const response = await axios.post('http://localhost:3030/user/add-friend', {                
                newFriendId: userId,
                userId: loggedUserId
            })
            if (response.data.success) {
                updateUserWithNewFriend(response.data.data)
            }
        }
        setFriendsRequests(friendsRequests.filter(request => request.id !== userId))
    }

    return (
        <BaseModal open={open} close={close}>
             <p className="text-lg lg:text-2xl mb-4">
                Solicitações de amizade                
            </p>
            {
                friendsRequests.length > 0 
                ?
                friendsRequests.map((user, key) => {
                    const avatar = generateAvatar(user.avatarSeed)
                    return (
                        <div key={key}  className="flex justify-between items-center border-2 rounded-xl p-2">
                            <img src={avatar} alt="User avatar"/>
                            <p className="text-xl">{user.name}</p>
                            <div className="flex gap-2">
                                <CheckCircleOutlineIcon onClick={() => handleRequest(user.id, true)} sx={{width:32, height:32, cursor: 'pointer', color: '#5cb85c'}}/>
                                <HighlightOffIcon onClick={() => handleRequest(user.id, false)} sx={{width:32, height:32, cursor: 'pointer', color: '#e23636'}}/>
                            </div>
                        </div>
                    )
                })
                :
                <p className="text-center text-xl text-slate-400 mt-8">Não há nenhuma solicitação por enquanto :(</p>
            }
        </BaseModal>
    )
}