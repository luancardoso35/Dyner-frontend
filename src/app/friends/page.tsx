'use client'
import FriendRequest from "@/components/common/Modal/FriendRequests";
import { NewFriend } from "@/components/common/Modal/NewFriend";
import Nav from "@/components/common/nav";
import WelcomeSection from "@/components/WelcomeSection";
import { UserContext } from "@/contexts/AuthContext";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useContext, useState } from "react";
import Image from "next/image";

export default function Friends() {
    const [newFriendModalIsOpen, setNewFriendModalIsOpen] = useState(false)
    const [friendRequestsModalIsOpen, setFriendRequestsModalIsOpen] = useState(false)
    const { user, decodeJwt } = useContext(UserContext)
    const friends = user?.friends 
    decodeJwt()

    const generateAvatar = (seed: string) => {
        return createAvatar(adventurer, {
            size: 80,
            seed: seed
          }).toDataUri();
    }

    return (
        <>
        {
            !user
            ?
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <Image className="w-24 h-24" src={require('../../../public/images/common/spinner.svg')} alt="spinner"/>
            </div>
            :
            <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
                <WelcomeSection/>
                <section className="lg:w-8/12 lg:px-32 flex-1 mt-2 lg:mt-0">
                    <section className="lg:flex lg:justify-between lg:items-center">
                        <h1 className="mb-4 lg:mb-0 mt-2 text-xl lg:text-3xl">Seus amigos</h1>
                        <div className="flex gap-2 justify-between"> 
                            <button onClick={() => setFriendRequestsModalIsOpen(true)} className="bg-[#252a34] appearance-none lg:text-xl text-white lg:py-2 py-1 lg:px-3 px-1 rounded-xl border-2"  name="" id="">Solicitações de amizade</button>
                            <button className="lg:text-xl bg-[#fe235a] text-[#252a34] font-bold lg:py-2 py-1 lg:px-3 px-1 rounded-xl" onClick={() => setNewFriendModalIsOpen(true)}>Adicionar amigo</button>
                        </div>
                    </section>
                    <main className="overflow-y-auto mt-2 w-full h-full lg:mt-16 max-h-[70svh] lg:w-[60%] m-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                    {
                        friends
                        &&
                        friends.length > 0
                        ?
                        friends.map((friend, key) => {
                            const friendAvatar = generateAvatar(friend.avatarSeed)
                            return (
                                <div className="flex gap-4 mb-4 justify-center items-center w-full bg-gray-600 rounded-xl lg:py-3 px-32 shadow-md shadow-gray-700 text-sm lg:text-base" key={key}>
                                    <img src={friendAvatar} alt="Logo do inicio"/>
                                    <p className="text-xl lg:text-4xl">{friend.name}</p>
                                </div>
                            )
                        })
                        :
                        <div className="h-full w-full flex justify-center items-center">
                            <p className="text-center text-3xl text-slate-400">Nenhum amigo por enquanto :(</p>
                        </div>
                    }
                    </main>
                </section>
                <NewFriend open={newFriendModalIsOpen} close={() => setNewFriendModalIsOpen(false)}/>
                <FriendRequest loggedUserId={user.id} open={friendRequestsModalIsOpen} close={() => setFriendRequestsModalIsOpen(false)}/>
                <Nav uri={'friends'}/>
            </div>
        }
        </>
    )
}