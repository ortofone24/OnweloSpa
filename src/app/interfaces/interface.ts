export enum apiLink {
  cp = 'CreatePerson',
  gav = 'GetAllVotersPersons',
  gac = 'GetAllCandidatesPersons',
  gavwnv = 'GetAllVotersPersonsWhoNotVoted',
  vhv = 'VoterHasVoted',
  ivbo = 'IncrementVotesByOne?name='
}

export interface createPerson {
  name: string;
  isVoter: boolean;
}

export interface getAllVoters {
  name: string;
  voted: boolean;
}

export interface voterHasVoted {
  name: string;
  voted: boolean;
}
