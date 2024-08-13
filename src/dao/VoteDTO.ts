import { VenuesOnVoteDTO } from "./VenuesOnVoteDTO";

export interface VoteDTO {
    id: string,
    roundId: string,
    userId: string,
    venuesOnVote: VenuesOnVoteDTO[]
}