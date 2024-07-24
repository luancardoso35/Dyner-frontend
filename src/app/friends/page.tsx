'use client'
import { BaseModal } from "@/components/common/Modal/BaseModal";
import { NewFriend } from "@/components/common/Modal/NewFriend";
import Nav from "@/components/common/nav";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo, useState } from "react";

const friends = [
    {
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        name: "Luan",
        avatarSeed: "sdasdadasds"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        name: "Luan",
        avatarSeed: "sdasdas"
    },
    {
        name: "Luan",
        avatarSeed: "sdasdadasds"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },{
        name: "Luan",
        avatarSeed: "sdasdas"
    },
]

export default function Friends() {
    const [newFriendModalIsOpen, setNewFriendModalIsOpen] = useState(false)
    function generateAvatar(seed: string) {
        return createAvatar(adventurer, {
            size: 80,
            seed: seed
          }).toDataUri();
    }
    

    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 48,
          seed: 'Gracie'
        }).toDataUri();
    }, []);

    return (
        <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
            <nav className="flex justify-between lg:hidden items-center gap-4">
                <p className="text-2xl">Bem vindo de volta, <span className="text-[#fe235a] font-bold">Thompson</span></p>
                <img  src={avatar} alt="Logo do inicio"/>
            </nav>
            <section className="lg:w-8/12 lg:px-32 flex-1 mt-2 lg:mt-0">
                <section className="flex justify-between items-center">
                    <h1 className="mt-2 text-xl lg:text-3xl">Seus amigos</h1>
                    <button className="lg:text-xl bg-[#fe235a] text-[#252a34] font-bold lg:py-2 py-1 px-3 rounded-xl" onClick={() => setNewFriendModalIsOpen(true)}>Adicionar amigo</button>
                </section>
                <main className="mt-2 lg:mt-16 overflow-y-scroll max-h-[70svh] lg:w-[60%] m-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                {
                    friends.map((friend, key) => {
                        const friendAvatar = generateAvatar(friend.avatarSeed)
                        return (
                            <div className="flex gap-4 mb-4 justify-center items-center w-full bg-gray-600 rounded-xl lg:py-3 px-32 shadow-md shadow-gray-700 text-sm lg:text-base" key={key}>
                                <img src={friendAvatar} alt="Logo do inicio"/>
                                <p className="text-xl lg:text-4xl">{friend.name}</p>
                            </div>
                        )
                    })
                }
                </main>
            </section>
            <NewFriend open={newFriendModalIsOpen} close={() => setNewFriendModalIsOpen(false)}/>
            <Nav uri={'friends'}/>
        </div>
    )
}