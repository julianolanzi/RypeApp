import { TeamNotificationsSuccess } from "src/app/models/notifications/notifications-team-success";
import { UserNotificationsSuccess } from "src/app/models/notifications/notifications-user-success";

export interface NotificationsState {
  userNotifications: UserNotificationsSuccess[];
  teamNotifications: TeamNotificationsSuccess[];
  errorNotifications?: Error,
}
