import { Typography } from "@mui/material";
import { BaseModal, ModalProps } from "./BaseModal";
import { KeyboardEventHandler, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ScheduleIcon from '@mui/icons-material/Schedule';
import axios from "axios";
import { UserContext } from "@/contexts/AuthContext";

function generateAvatar(seed: string) {
    return createAvatar(adventurer, {
        size: 80,
        seed: seed
      }).toDataUri();
}

interface Friend {
    id: string;
    name: string;
    avatarSeed: string;
}

export function NewFriend({open, close}: ModalProps) {
    const [friends, setFriends] = useState<Friend[]>([])
    const { user } = useContext(UserContext)
    const [friendUsername, setFriendUsername] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [allPeopleRequestedIds, setAllPeopleRequestedIds] = useState<string[]>([])

    useEffect(() => {
        fetchAllPeopleRequestedIds();

        async function fetchAllPeopleRequestedIds() {
            const {data} = await axios.get('http://localhost:3030/request/get-all-requested', { params: {
                userId: user?.id
            }})

            setAllPeopleRequestedIds(data.data);
        }
    }, [user?.id])

    async function addFriend({id}: {id: string}) {

        const {data} = await axios.post('http://localhost:3030/request/add-friend-request', {
            receiverId: id,
            senderId: user?.id
        })

        if (data.success) {
            setAllPeopleRequestedIds([...allPeopleRequestedIds, id])
        }
    }

    async function searchUsers(event?: React.KeyboardEvent<HTMLInputElement>) {
        if (event && event.key !== 'Enter') return
        try {
            setLoading(true)
            const {data} = await axios.get('http://localhost:3030/user/search-friends', { params: {
                name: friendUsername,
                username: user?.name
            }})

            if (data.success) {
                setFriends(data.data)
            } else {
                setError(true)
                setMessage("Nenhum usuário encontrado.")    
            }
            setLoading(false)
        } catch (error) {
            setError(true)
            setMessage("Ocorreu um erro. Tente novamente.")
        }
    }

    function reset() {
        setFriends([]);
        setFriendUsername('')
    }

    return (
        <BaseModal open={open} close={() => {close(); reset();}}>
             <p className="text-xl lg:text-2xl">
                Adicionar amigo
            </p>

            <div className="lg:mt-4">
                <p className="text-lg" >Insira o nome ou nome de usuário</p>
                <div className="w-full flex justify-end items-center relative">
                    <input onKeyDown={searchUsers} onChange={(event) => setFriendUsername(event.target.value)} className="rounded p-3 bg-[#252a34] border-gray-500 border-[1px] text-base lg:text-xl w-full mt-1" placeholder="Pesquisar.." type="text" name="" id="" />
                    <Image onClick={() => searchUsers()} alt="search logo" className="w-4 h-4 cursor-pointer invert brightness-0 absolute mr-4" src={require('../../../../public/images/common/lupa.png')}/>
                </div>
            </div>

            {
                loading
                ?
                <Image className="w-12 h-12 m-auto mt-4" src={require('../../../../public/images/common/spinner.svg')} alt="spinner"/>
                :
                <main className="mt-4 overflow-y-scroll max-h-[60svh] m-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                {
                    error
                    ?
                    <p>{message}</p>
                    :
                    friends.length > 0 &&
                    friends.map((friend) => {
                        const friendAvatar = generateAvatar(friend.avatarSeed)
                        return (
                            <div className="flex gap-4 mb-4 justify-center items-center w-full bg-gray-600 rounded-xl lg:py-3 lg:px-4 shadow-md shadow-gray-700 text-sm lg:text-base" key={friend.id}>
                                <img className="lg:w-auto lg:h-auto w-12 h-12" src={friendAvatar} alt="Logo do avatar"/>
                                <p className="text-xl lg:text-2xl ">{friend.name}</p>
                                {
                                    user?.friends.map(friend => friend.id).indexOf(friend.id) !== -1
                                    ?
                                    <CheckIcon sx={{color: '#5cb85c'}}/>
                                    :
                                    allPeopleRequestedIds.indexOf(friend.id) !== -1
                                    ?
                                    <ScheduleIcon/>
                                    :
                                    <AddIcon onClick={() => addFriend({id: friend.id})} sx={{bgcolor: '#ff2e63', borderRadius: '16px', color: '#252a34'}} className="cursor-pointer"/>
                                }
                            </div>
                        )
                    })
                }
                </main>
            }
        </BaseModal>
    )
}