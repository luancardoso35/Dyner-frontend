import { useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'  // without this line it didn't work
import Poll from "../Modal/Poll";
import { UserDTO } from "@/dao/UserDTO";
import { PollDTO } from "@/dao/PollDTO";
moment.locale('pt-br')

type PollProps = {
    pollDetails: PollDTO
}

export default function VenueDetails({pollDetails} : PollProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className={`${!pollDetails.closed && 'pt-8'} bg-gray-600 rounded-xl py-3  lg:px-6 px-4 shadow-md shadow-gray-700 text-sm lg:text-base max-h-52`}>
            <p className="text-base lg:text-xl">{pollDetails.users.filter((_, index) => index < 2).map(user => user.name).join(', ')} {pollDetails.users.length > 2 && <span className="text-slate-400">+{pollDetails.users.length-2}</span>}</p>
            <p className="text-slate-400 lg:text-xl mb-4">{moment(pollDetails.created).fromNow()}</p>
            <p hidden={!pollDetails.closed} className="text-center lg:text-xl lg:p-2 text-[#fe235a]"><span className="font-bold block lg:inline-block text-white">Local escolhido:&nbsp;</span>{'teste'}</p>
            <div className="flex justify-center">
                <button onClick={() => setIsModalOpen(true)} className={`lg:p-2 w-full rounded-lg ${pollDetails.closed ? 'bg-slate-700 p-1' : 'bg-[#fe235a] font-bold text-xl lg:mt-4 text-[#252a34]'} lg:mt-0 lg:max-w-64 lg:m-auto`}>{pollDetails.closed ?'Clique para ver mais' : 'Votar'}</button>
            </div>
            {
                isModalOpen
                &&
                <Poll pollId={pollDetails.id} open={isModalOpen} close={() => setIsModalOpen(false)} users={pollDetails.users}/>
            }
        </div>
    )
}