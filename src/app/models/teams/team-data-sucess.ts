export interface TeamDataSuccess {
  idTeam: string;
  name: string;
  tagName: string;
  ranking: string;
  admin: {
    url: string;
    nickname: string;
    country: string;
  };
  description: string;
  emailTeam: string;
  discordTeam: string;
  facebookTeam: string;
  youtubeTeam: string;
  instagramTeam: string;
  url: string;
  members: Array<any>;
  adminMembers: Array<any>;
  lines: Array<any>;
  private: boolean;

  createdAt: Date | undefined;
}
