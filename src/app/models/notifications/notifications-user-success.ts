export interface UserNotificationsSuccess {
  _id: string;
  title: string;
  description: {
    message: string;
    name: string;
    url: string;
    question: boolean;
  };
  ready: boolean;
  request: boolean;
  type: string;
  user: string;
  team: string;
  createdAt: string;
}
