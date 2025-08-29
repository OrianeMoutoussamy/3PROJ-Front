import { User } from "../auth/User";

export interface Channel {
  id: number;
  user: User;
  profilePicture?: string;
  username: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}