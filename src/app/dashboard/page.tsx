'use client'
import PollDetails from "@/components/common/Cards/PollDetails";
import { NewPoll } from "@/components/common/Modal/NewPoll";
import Nav from "@/components/common/nav";
import WelcomeSection from "@/components/WelcomeSection";
import { UserContext } from "@/contexts/AuthContext";
import { PollDTO } from "@/dao/PollDTO";
import { UserDTO } from "@/dao/UserDTO";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
    const [polls, setPolls] = useState<PollDTO[]>([])
    const [newPollModalOpen, setNewPollModalOpen] = useState(false)
    const { user, decodeJwt } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    decodeJwt();

    useEffect(() => {
        setLoading(true)
        fetchPolls()

        async function fetchPolls() {
            if (!user) return
            const { data } = await axios.get('http://localhost:3030/poll/', { params: {
                id: user?.id
            }})
            setPolls(data.data)
            setLoading(false)
        }
    }, [user])
      
    return (
        <>
        {
            user &&
            !loading &&
            
        <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
            <WelcomeSection/>
            <section className="lg:w-8/12 lg:px-10 xl:px-32 flex-1">
                <section className="flex justify-between items-center">
                    <h1 className="mt-2 text-xl lg:text-3xl">Suas votações recentes</h1>
                    <button className="lg:text-xl bg-[#fe235a] text-[#252a34] font-bold p-1 lg:py-2 lg:px-3 rounded-xl" onClick={() => setNewPollModalOpen(true)}>Nova votação</button>
                </section>
                    <section className={`${polls.length > 0 && 'grid grid-cols-2 lg:grid-cols-3'} gap-2 lg:gap-4 mt-6 lg:max-h-[55vh] h-full max-h-[70vh] ${polls.length > 12 && 'overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'}`}>
                        {
                            polls.length > 0
                            ?
                            polls.map((poll, key) => {
                                return (
                                    <PollDetails key={key} pollDetails={poll}/>
                                )
                            })
                            :
                            <div className="h-full w-full flex justify-center items-center">
                            <p className="text-center text-3xl text-slate-400">Nenhuma votação por enquanto :(</p>
                        </div>
                        }
                    </section>
            </section>
            <Nav uri={'dashboard'}/>
            <NewPoll open={newPollModalOpen} close={() => setNewPollModalOpen(false)}/>
        </div>
        }
        </>
    )
}