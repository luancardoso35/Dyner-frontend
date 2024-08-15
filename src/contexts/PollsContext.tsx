import { PollDTO } from "@/dao/PollDTO"
import { createContext, useState } from "react"

interface PollContextValues {
    polls: PollDTO[],
    setPolls: (polls: PollDTO[]) => void
}

const PollContext = createContext<PollContextValues>({} as PollContextValues)

function PollContextProvider({children} : {children: React.ReactNode}) {
    const [polls, setPolls] = useState<PollDTO[]>([])

    return (
        <PollContext.Provider value={{ polls, setPolls }}>
            {children}
        </PollContext.Provider>
    )
}

export { PollContextProvider, PollContext }
