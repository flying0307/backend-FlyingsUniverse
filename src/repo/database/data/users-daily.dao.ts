import { DbConn } from '@db/db-conn';
import { UsersDailyType, PartialUsersDailyType } from '@db/data/users-daily.type';

const UsersDailyDao = {
  async getDaily(uid: string, today: string, timestamp?: number): Promise<UsersDailyType | null> {
    const partQ: PartialUsersDailyType = {
      [UsersDailyType.COL_USER_ID]: uid,
      [UsersDailyType.COL_DATE]: today,
    };

    if (timestamp) {
      partQ[UsersDailyType.COL_TIMESTAMP] = DbConn.raw(`to_timestamp(${timestamp})`);
    }
    try {
      const daily = await DbConn.select('*').from(UsersDailyType.TABLE_NAME).where(partQ);
      if (daily.length === 0) {
        return null;
      } else {
        return daily[0];
      }
    } catch (error) {
      return null;
    }
  },
  async addDaily(uid: string, today: string, timestamp: number, conflictStrategy: 'ignore' | 'merge' = 'ignore'): Promise<boolean> {

    const partI: PartialUsersDailyType = {
      [UsersDailyType.COL_USER_ID]: uid,
      [UsersDailyType.COL_DATE]: today,
      [UsersDailyType.COL_TIMESTAMP]: DbConn.raw(`to_timestamp(${timestamp})`),
    };
    let query;
    if (conflictStrategy === 'ignore') {
      query = DbConn.insert(partI).into(UsersDailyType.TABLE_NAME)
        .onConflict([UsersDailyType.COL_USER_ID, UsersDailyType.COL_DATE]).ignore();
    } else if (conflictStrategy === 'merge') {
      query = DbConn.insert(partI).into(UsersDailyType.TABLE_NAME)
        .onConflict([UsersDailyType.COL_USER_ID, UsersDailyType.COL_DATE]).merge();
    }
    try {
      const insertedIds = await query;
      //console.log(insertedIds);
      return true;
    } catch (error) {
      return false;
    }
  },

  async addDailyMerge(uid: string, today: string, timestamp: number): Promise<boolean> {
    return UsersDailyDao.addDaily(uid, today, timestamp, 'merge');
  },

  async addDailyIgnore(uid: string, today: string, timestamp: number): Promise<boolean> {
    return UsersDailyDao.addDaily(uid, today, timestamp, 'ignore');
  },

  async getAverageActiveSession(numberOfDays: number): Promise<number> {
    try {

      const dates: string[] = [];
      for (let i = 0; i < numberOfDays; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
        dates.push(dateString);
      }
      // console.log('dates');
      // console.log(dates);
      type DailyCountRecord = {
        count: string;
        [UsersDailyType.COL_DATE]: string;
      };

      const dailys = await DbConn.select(DbConn.raw('count(*) as count , date'))
        .from(UsersDailyType.TABLE_NAME)
        .whereIn(UsersDailyType.COL_DATE, dates)
        .groupBy(UsersDailyType.COL_DATE) as DailyCountRecord[];
      // console.log('dailys');
      // console.log(dailys);
      let sum = 0;
      for (const d of dailys) {
        sum += Number(d.count);
      }
      return sum / numberOfDays;

    } catch (error) {
      console.error(error);
      return 0;
    }
  },

  async getLastSessionTime(uid: string): Promise<string | null> {
    try {
      const partQ: PartialUsersDailyType = {
        [UsersDailyType.COL_USER_ID]: uid,
      };
      const daily = await DbConn.select('*').
        from(UsersDailyType.TABLE_NAME).where(partQ).orderBy(UsersDailyType.COL_TIMESTAMP, 'desc') as PartialUsersDailyType[];
      if (daily.length === 0) {
        return null;
      } else {
        const ts = daily[0].timestamp as Date;
        const isoTime = ts.toISOString();
        //console.log(`ts ${ts} isoTime ${isoTime} `);
        return isoTime;
      }
    } catch (error) {
      return null;
    }
  },
};
export default UsersDailyDao;