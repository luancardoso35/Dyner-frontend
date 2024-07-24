import { Typography } from "@mui/material";
import { BaseModal, ModalProps } from "./BaseModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const friends = [
    {
        username: 'xxx1',
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        username: 'xxx2',
        name: "Luan",
        avatarSeed: "sdasdadasds"
    },{
        username: 'xxx3',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx4',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdadasds"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        username: 'xxx',
        name: "Luan",
        avatarSeed: "sdasdas"
    },
]

function generateAvatar(seed: string) {
    return createAvatar(adventurer, {
        size: 80,
        seed: seed
      }).toDataUri();
}

export function NewFriend({open, close}: ModalProps) {
    const [friendUsername, setFriendUsername] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [checkIcon, setCheckIcon] = useState<boolean>(false);
    const [selectedFriendUsername, setSelectedFriendUsername] = useState<string>('')

    function addFriend(friend: any) {
        setSelectedFriendUsername(friend.username)
        setCheckIcon(true)
        console.log(friend);
    }

    const timer = setTimeout(() => {
        setCheckIcon(false);
        return () => clearTimeout(timer);
    }, 5000);
 

    return (
        <BaseModal open={open} close={() => {close(); setCheckIcon(false);}}>
             <p className="text-xl lg:text-3xl">
                Adicionar amigo
            </p>

            <div className="lg:mt-4">
                <p className="text-lg" >Insira o nome ou nome de usuário</p>
                <div className="w-full flex justify-end items-center relative">
                    <input onChange={(event) => setFriendUsername(event.target.value)} className="rounded p-3 bg-[#252a34] border-gray-500 border-[1px] text-base lg:text-xl w-full mt-1" placeholder="Pesquisar.." type="text" name="" id="" />
                    <Image alt="search logo" className="w-4 h-4 cursor-pointer invert brightness-0 absolute mr-4" src={require('../../../../public/images/common/lupa.png')}/>
                </div>
            </div>

            {
                loading
                ?
                <Image className="w-12 h-12 m-auto mt-4" src={require('../../../../public/images/common/spinner.svg')} alt="spinner"/>
                :
                <main className="mt-2 overflow-y-scroll max-h-[60svh] m-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                {
                    friends.map((friend, key) => {
                        const friendAvatar = generateAvatar(friend.avatarSeed)
                        return (
                            <>
                                <div className="flex gap-4 mb-4 justify-center items-center w-full bg-gray-600 rounded-xl lg:py-3 lg:px-16 shadow-md shadow-gray-700 text-sm lg:text-base" key={key}>
                                    <img className="lg:w-auto lg:h-auto w-12 h-12" src={friendAvatar} alt="Logo do avatar"/>
                                    <p className="text-xl lg:text-4xl">{friend.name}</p>
                                    {
                                        checkIcon && friend.username === selectedFriendUsername
                                        ?
                                        <CheckIcon sx={{color: '#5cb85c'}}/>
                                        :
                                        <AddIcon onClick={() => addFriend(friend)} sx={{bgcolor: '#ff2e63', borderRadius: '16px', color: '#252a34'}} className="cursor-pointer"/>
                                    }
                                </div>
                            </>
                        )
                    })
                }
                </main>
            }
        </BaseModal>
    )
}