export interface CreateTeamSuccess {
  name: string;
  tagName: string;
  idTeam: string;
  ranking: string;
  admin: string;
  description: string;
  instagramTeam: string;
  discordTeam: string;
  emailTeam: string;
  facebookTeam: string;
  youtubeTeam: string;
  members: [];
  lines: [];
  adminMembers: [];
  id: string;
  url: string;
  private: boolean;
  createdAt: Date | undefined;
}
