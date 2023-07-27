import { DbConn } from '@db/db-conn';
import { PartialUsersType, UsersType } from '@db/data/users.type';

const UsersDao = {
  async getUser(email: string, password?: string): Promise<UsersType | null> {
    const partQ: PartialUsersType = {
      [UsersType.COL_EMAIL]: email,
    };

    if (password) {
      partQ[UsersType.COL_PASSWORD] = password;
    }

    const user = await DbConn.select('*').from(UsersType.TABLE_NAME).where(partQ);

    if (user.length === 0) {
      return null;
    } else {
      return user[0];
    }
  }
  ,

  async addUser(email: string, name: string, password: string, conflictStrategy: 'ignore' | 'merge' = 'ignore'): Promise<boolean> {
    const partI: PartialUsersType = {
      [UsersType.COL_EMAIL]: email,
      [UsersType.COL_NAME]: name,
      [UsersType.COL_PASSWORD]: password,
    };
    let query;

    if (conflictStrategy === 'ignore') {
      query = DbConn.insert(partI).into(UsersType.TABLE_NAME)
        .onConflict([UsersType.COL_EMAIL]).ignore();
    } else if (conflictStrategy === 'merge') {
      query = DbConn.insert(partI).into(UsersType.TABLE_NAME)
        .onConflict([UsersType.COL_EMAIL]).merge();
    }
    try {
      const insertedIds = await query;
      //console.log(insertedIds);
      return true;
    } catch (error) {
      return false;
    }
  },

  async addUserIgnore(email: string, name: string, password: string): Promise<boolean> {
    return UsersDao.addUser(email, name, password, 'ignore');
  }
  ,
  async addUserMerge(email: string, name: string, password: string): Promise<boolean> {
    return UsersDao.addUser(email, name, password, 'merge');
  },

  async updateUserPassword(email: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const partQ: PartialUsersType = {
      [UsersType.COL_EMAIL]: email,
      [UsersType.COL_PASSWORD]: oldPassword,
    };
    const partU: PartialUsersType = {
      [UsersType.COL_PASSWORD]: newPassword,
    };

    try {
      const numberOfRowsUpdated = await DbConn
        .from(UsersType.TABLE_NAME)
        .where(partQ)
        .update(partU);

      if (numberOfRowsUpdated > 0) {
        console.log('Password updated successfully');
        return true;
      } else {
        console.log('User not found or old password is incorrect');
        return false;
      }
    } catch (error) {
      return false;
    }
  },

  async vaildationPassword(email: string, password: string): Promise<boolean> {
    const partQ: PartialUsersType = {
      [UsersType.COL_EMAIL]: email,
      [UsersType.COL_PASSWORD]: password,
    };

    const qNumOfRows = await DbConn
      .from(UsersType.TABLE_NAME)
      .where(partQ);
    if (qNumOfRows.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};
export default UsersDao;