'use client'
import PollDetails from "@/components/common/Cards/PollDetails";
import { NewPoll } from "@/components/common/Modal/NewPoll";
import Nav from "@/components/common/nav";
import WelcomeSection from "@/components/WelcomeSection";
import { UserContext } from "@/contexts/AuthContext";
import { PollContext } from "@/contexts/PollsContext";
import { PollDTO } from "@/dao/PollDTO";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";

export default function Dashboard() {
    const { polls, setPolls } = useContext(PollContext)
    const [newPollModalOpen, setNewPollModalOpen] = useState(false)
    const { user, decodeJwt } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    decodeJwt();

    useMemo(async () => {
        axios.get(`${process.env.BASE_URL}/poll/`, { params: {
            id: user?.id
        }}).then((response) => {
            setPolls(response.data.data)
        }).catch((_) => {
            
        })
    }, [setPolls, user?.id])

    const handleNewPoll = (newPoll: PollDTO) => {
        setPolls([newPoll, ...polls ])
    }
      
    return (
        <>
        {
            !(user && !loading) 
            ?
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <Image className="w-24 h-24" src={require('../../../public/images/common/spinner.svg')} alt="spinner"/>
            </div>
            :
            <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
                <WelcomeSection/>
                <section className="lg:w-8/12 lg:px-10 xl:px-32 flex-1">
                    <section className="flex justify-between items-center">
                        <h1 className="mt-2 text-xl lg:text-3xl">Suas votações recentes</h1>
                        <button className="lg:text-xl bg-[#fe235a] text-[#252a34] font-bold p-1 lg:py-2 lg:px-3 rounded-xl" onClick={() => setNewPollModalOpen(true)}>Nova votação</button>
                    </section>
                        <section className={`${polls.length > 0 && 'grid grid-cols-2 lg:grid-cols-3'} auto-rows-[max-content] gap-2 lg:gap-4 mt-6 lg:max-h-[100vh] h-full max-h-[70vh] lg:overflow-auto ${polls.length > 2 && 'overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'}`}>
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
                <NewPoll handleNewPoll={handleNewPoll} open={newPollModalOpen} close={() => setNewPollModalOpen(false)}/>
            </div>
        }
        </>
    )
}