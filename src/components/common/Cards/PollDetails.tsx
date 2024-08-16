import { useContext, useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'
import Poll from "../Modal/Poll";
import { PollDTO } from "@/dao/PollDTO";
import axios from "axios";
import { VenueDTO } from "@/dao/VenueDTO";
import { PollContext } from "@/contexts/PollsContext";
import { UserContext } from "@/contexts/AuthContext";
moment.locale('pt-br')

type PollProps = {
    pollDetails: PollDTO
}

export default function VenueDetails({pollDetails} : PollProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [winnerVenue, setWinnerVenue] = useState<VenueDTO>()
    const { setPolls } = useContext(PollContext)
    const { user } = useContext(UserContext)

    async function refreshWithWinner(): Promise<void> {
        if (!user) return
        const { data } = await axios.get(`${process.env.BASE_URL}/poll/`, { params: {
            id: user?.id
        }})
        setPolls(data.data)
    }
    
    useEffect(() => {
        if (pollDetails.closed && pollDetails.winnerVenueId) {
            fetchWinnerVenueName()
        }

        async function fetchWinnerVenueName() {
            const { data } = await axios.get(`${process.env.BASE_URL}/venue/${pollDetails.winnerVenueId}`)
            setWinnerVenue(data.data[0])
        }
    }, [pollDetails.closed, pollDetails.winnerVenueId])

    return (
        <div className={`bg-gray-600 h-[208px] lg:h-48 relative rounded-xl py-3 lg:px-6 px-4 shadow-md shadow-gray-700 text-sm lg:text-base max-h-52`}>
            <p className="text-sm lg:text-xl max-h-[40px]">{pollDetails.users?.filter((_, index) => index < 2).map(user => user.name).join(', ')} {pollDetails.users?.length > 2 && <span className="text-slate-400">+{pollDetails.users.length-2}</span>}</p>
            <p className={`text-slate-400 lg:text-xl lg:mb-0 ${pollDetails.closed ? 'xxs:mb-2 xs:mb-6 s:mb-64' : 'mb-6'} `}>{moment(pollDetails.created).fromNow()}</p>
            <p className={`text-center lg:text-xl lg:p-2 text-[#fe235a] min-h-[72px] ${pollDetails.closed && 'lg:-mt-6'}`}><span className={`font-bold block lg:inline-block ${pollDetails.closed ? 'text-white' : 'text-slate-200'}`}>{pollDetails.closed ? pollDetails.winnerVenueId ? 'Local escolhido:\u00A0' : 'Votação encerrada sem vencedores :(' : 'Votação em andamento'}</span>{winnerVenue?.name}</p>
            <div className="flex justify-center">
                <button onClick={() => setIsModalOpen(true)} className={`lg:p-2 w-full rounded-lg ${pollDetails.closed ? 'bg-slate-700 p-1' : 'bg-[#fe235a] font-bold text-xl text-[#252a34]'} lg:max-w-64 lg:m-auto`}>{pollDetails.closed ? 'Clique para ver mais' : 'Votar'}</button>
            </div>
            {
                isModalOpen
                &&
                <Poll refreshWithWinner={refreshWithWinner} pollId={pollDetails.id} open={isModalOpen} close={() => setIsModalOpen(false)} users={pollDetails.users}/>
            }
        </div>
    )
}