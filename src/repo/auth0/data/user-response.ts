import { UserModel } from '@model/user-model';
import UtAuth from '@utils/ut-auth';
//Generate models and serializers from JSON by https://app.quicktype.io/
interface User {
  user_id: string;
  email: string;
  email_verified: boolean;
  username: string;
  phone_number: string;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  picture: string;
  name: string;
  nickname: string;
  last_login: string;
  logins_count: number;
  blocked: boolean,
  given_name: string,
  family_name: string,
}

const UserResponse = {
  toUserModel(user: User): UserModel {
    return {
      user_id: user.user_id,
      email: user.email,
      email_verified: user.email_verified,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
      picture: user.picture,
      name: user.name,
      nickname: user.nickname,
      last_login: user.last_login,
      logins_count: user.logins_count,
      type: UtAuth.getTypeFromSub(user.user_id),
      last_session: '',
    } as UserModel;
  },
};
export default UserResponse;