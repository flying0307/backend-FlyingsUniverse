export class UsersType {
  static readonly TABLE_NAME = 'users';

  static readonly COL_EMAIL = 'email';

  static readonly COL_NAME = 'name';

  static readonly COL_PASSWORD = 'password';

}

export interface PartialUsersType {
  [UsersType.COL_EMAIL]?: string;
  [UsersType.COL_NAME]?: string;
  [UsersType.COL_PASSWORD]?: string;
}