export class UsersDailyType {
  static readonly TABLE_NAME = 'users_daily';

  static readonly COL_USER_ID = 'user_id';

  static readonly COL_DATE = 'date';

  static readonly COL_TIMESTAMP = 'timestamp';

}
export interface PartialUsersDailyType {
  [UsersDailyType.COL_USER_ID]?: string;
  [UsersDailyType.COL_DATE]?: string;
  [UsersDailyType.COL_TIMESTAMP]?: any;
}