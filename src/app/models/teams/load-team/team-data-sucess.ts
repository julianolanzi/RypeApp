export interface TeamDataSuccess {
  _id: string;
  idTeam: string;
  name: string;
  tagName: string;
  ranking: string;
  admin: {
    url: string;
    nickname: string;
    country: string;
    name: string;
    urlCover: string;
    _id: string;

    social: {
      discord: string;
      instagram: string;
      facebook: string;
      youtube: string;
      twitter: string;
      twitch: string;
      psn: string;
      xbox: string;
      idGame:string;
  }
  };
  description: string;
  emailTeam: string;
  discordTeam: string;
  facebookTeam: string;
  youtubeTeam: string;
  instagramTeam: string;
  url: string;
  urlCover: string;
  members: Array<any>;
  adminMembers: Array<any>;
  lines: Array<any>;
  private: boolean;

  createdAt: Date | undefined;
}
