import { VenuesOnPollRoundDTO } from "./VenuesOnPollRound";
import { VoteDTO } from "./VoteDTO";

export interface PollRoundDTO {
    id: string,
    pollId: string,
    roundNumber: number,
    votes: VoteDTO[],
    venuesOnPollRound: VenuesOnPollRoundDTO[]
}