import UsersDailyDao from '@db/data/users-daily.dao';
import UsersDao from '@db/data/users.dao';
import UtTime from '@utils/ut-time';
import { UsersType } from '@db/data/users.type';

const DbApi = {
  async activeSession(uid: string): Promise<boolean> {
    const { today, timestamp } = UtTime.getToday();
    const result = await UsersDailyDao.addDailyMerge(uid, today, timestamp);
    return result;
  },
  async addUser(email: string, name: string, password: string): Promise<boolean> {
    const result = await UsersDao.addUserMerge(email, name, password);
    return result;
  },
  async getUser(email: string, password?: string): Promise<UsersType | null> {
    const result = await UsersDao.getUser(email, password);
    return result;
  },
  async vaildationPassword(email: string, password: string): Promise<boolean> {
    const result = await UsersDao.vaildationPassword(email, password);
    return result;
  },
  async updateUserPassword(email: string, password: string, newPassword: string): Promise<boolean> {
    const result = await UsersDao.updateUserPassword(email, password, newPassword);
    return result;
  },
  async getAverageActiveSession(numberOfDays: number): Promise<number> {
    return UsersDailyDao.getAverageActiveSession(numberOfDays);
  },
  async getLastSessionTime(uid: string): Promise<string | null> {
    return UsersDailyDao.getLastSessionTime(uid);
  },

};
export default DbApi;