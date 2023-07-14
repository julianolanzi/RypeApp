export interface SearchMemberSucess {
  id: string;
  nickname: string;
  name: string;
  country: string;
  verify: boolean;
  url: string;
  team: any;
  urlCover: string;
  isNotInvite: boolean;
  social: {
    discord: string;
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
    twitch: string;
    psn: string;
    xbox: string;
    idGame: string;
  }
}
