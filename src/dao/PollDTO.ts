import { PollRoundDTO } from "./PollRoundDTO";
import { UserDTO } from "./UserDTO";

export interface PollDTO {
    id: string,
    users: UserDTO[],
    closed: boolean,
    winnerVenueId?: string,
    rounds: PollRoundDTO[],
    created: Date
}