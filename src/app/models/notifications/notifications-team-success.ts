export interface TeamNotificationsSuccess {
  title: string;
  description: {
    message: string;
    name: string;
    url: string;
  };
  ready: boolean;
  request: boolean;
  type: string;
  user: string;
  team: string;
  createdAt: string;
}
