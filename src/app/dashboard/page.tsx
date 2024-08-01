'use client'
import PollDetails from "@/components/common/Cards/PollDetails";
import { NewPoll } from "@/components/common/Modal/NewPoll";
import Nav from "@/components/common/nav";
import WelcomeSection from "@/components/WelcomeSection";
import { UserContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

export default function Dashboard() {
    const polls = [
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'avenida itatiaia 265, ribeirão preto, sp',
                    selected: false
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                }]
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [
                    {
                        id:'1', 
                        name:'dasdsaadsas',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
                [
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    },
                    {
                        id:'1', 
                        name:'una gastronomia',
                        address:'rua teste',
                        selected: true
                    }
                ],
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                }]
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: false
                }]
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                }]
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                }]
            ]
        },
        {
            participants: [{name: "luan"}, {name: "José"}],
            winnerPlace: {},
            closedAt: new Date(),
            rounds: [
                [{
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                },
                {
                    id:'1', 
                    name:'una gastronomia',
                    address:'rua teste',
                    selected: true
                }]
            ]
        },
    ]
    const [newPollModalOpen, setNewPollModalOpen] = useState(false)
    const { user, decodeJwt } = useContext(UserContext)
    decodeJwt();

      const createNewPoll = () => {
        
      }
      
    return (
        <>
        {
            user &&
            
        <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
            <WelcomeSection/>
            <section className="lg:w-8/12 lg:px-10 xl:px-32 flex-1">
                <section className="flex justify-between items-center">
                    <h1 className="mt-2 text-xl lg:text-3xl">Suas votações recentes</h1>
                    <button className="lg:text-xl bg-[#fe235a] text-[#252a34] font-bold p-1 lg:py-2 lg:px-3 rounded-xl" onClick={() => setNewPollModalOpen(true)}>Nova votação</button>
                </section>
                    <section className={`grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-6 lg:max-h-[85vh] max-h-[70vh] ${polls.length > 12 && 'overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'}`}>
                        {
                            polls.map((poll, key) => {
                                return (
                                    <PollDetails key={key} pollDetails={
                                        {participants: poll.participants,
                                        winnerPlace: poll.winnerPlace,
                                        closedAt: poll.closedAt,
                                        rounds: poll.rounds}
                                    }/>
                                )
                            })
                        }
                    </section>
            </section>
            <Nav uri={'dashboard'}/>
            <NewPoll saveFunction={createNewPoll} open={newPollModalOpen} close={() => setNewPollModalOpen(false)}/>
        </div>
        }
        </>
    )
}