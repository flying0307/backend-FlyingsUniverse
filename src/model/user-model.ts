export interface UserModel {
  user_id: string;
  email: string;
  email_verified: boolean;
  username: string;
  created_at: string;
  updated_at: string;
  picture: string;
  name: string;
  nickname: string;
  last_login: string;
  logins_count: number;
  last_session: string;
}