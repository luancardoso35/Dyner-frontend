import { useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'  // without this line it didn't work
import Poll from "../Modal/Poll";
moment.locale('pt-br')

type Participant = {
    name: string
}

type PollDetails = {
    participants: Participant[],
    winnerPlace: object,
    closedAt: Date,
    rounds: (object[])[]
}

type PollProps = {
    pollDetails: PollDetails
}

export default function VenueDetails({pollDetails} : PollProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
      
    return (
        <div className="bg-gray-600 rounded-xl py-3 px-4 shadow-md shadow-gray-700 text-sm lg:text-base">
            <p className="text-base lg:text-xl">{pollDetails.participants.map(participant => participant.name).join(', ')} {pollDetails.participants.length > 2 && <span className="text-slate-400">`+{pollDetails.participants.length-2}`</span>}</p>
            <p className="text-slate-400 lg:text-xl">{moment(pollDetails.closedAt).fromNow()}</p>
            <p className="text-center lg:text-xl lg:p-2 mt-2 text-[#fe235a]"><span className="font-bold block lg:inline-block text-white">Local escolhido:&nbsp;</span>{pollDetails.rounds.at(-1)?.filter(item => item.selected)[0].name}</p>
            <div className="flex justify-center">
                <button onClick={() => setIsModalOpen(true)} className="mt-2 lg:p-2 w-full rounded-lg bg-slate-700 p-1 lg:max-w-64 lg:m-auto">Clique para ver mais</button>
            </div>
            <Poll rounds={pollDetails.rounds} open={isModalOpen} close={() => setIsModalOpen(false)} participants={pollDetails.participants}/>
        </div>
    )
}