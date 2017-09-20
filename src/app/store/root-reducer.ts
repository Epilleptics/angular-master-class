import { voteReducer } from "./votes/vote-reducer";
import { VotesState } from "./votes/vote-state";

export const ROOT_REDUCER = {
  votes: voteReducer
};

export interface ApplicationState {
  votes: VotesState
}
