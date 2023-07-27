import { ChangePwdModel } from '@model/change-pwd-model';
import { UserModel } from '@model/user-model';
import Auth0Api from '@auth0/auth0-api';
import DbApi from '@db/db-api';
import UtPassword from '../utils/ut-password';

const RepoUser = {
  async createUser(email: string, name: string, password: string): Promise<boolean> {
    console.log('createUser');
    return DbApi.addUser(email, name, password);
  },

  async postUpdateUserPassword(email: string, name: string, password: string): Promise<boolean> {
    console.log('postUpdateUserPassword');
    return DbApi.addUser(email, name, password);
  },

  async updatePassword(userId: string, email: string, oldPwd: string, newPwd: string): Promise<ChangePwdModel> {
    console.log('updatePassword');

    //Check password strength 
    const strongPassword = UtPassword.strongPassword(newPwd);
    const resultPasswordInvaild = {
      strong: strongPassword,
      vaild: false,
      changed: false,
    } as ChangePwdModel;

    const resultChangeFail = {
      strong: strongPassword,
      vaild: true,
      changed: false,
    } as ChangePwdModel;

    const resultSuccess = {
      strong: strongPassword,
      vaild: true,
      changed: true,
    } as ChangePwdModel;

    if (!strongPassword) {
      return resultPasswordInvaild;
    }

    //Step 1 : check old password is vaild in local database
    const vaildOldPwd = await DbApi.vaildationPassword(email, oldPwd);
    if (vaildOldPwd == false) {
      return resultPasswordInvaild;
    }
    //Step 2 : update password in auth0
    const auth0PasswordUpdated = await Auth0Api.updatePassword(userId, newPwd);
    if (auth0PasswordUpdated) {
      //Step 3 : update password in local database
      const updateResult = await DbApi.updateUserPassword(email, oldPwd, newPwd);
      console.log(updateResult);
      if (!updateResult) {
        console.error('db update password fail');
      }
      return resultSuccess;
    } else {

      return resultChangeFail;
    }
  },

  async getUser(id: string): Promise<UserModel | null> {
    return Auth0Api.getUser(id);
  },

  async getAllUser(): Promise<UserModel[] | null> {
    const users = await Auth0Api.getUsers();
    if (users) {
      for (const u of users) {
        const last = await DbApi.getLastSessionTime(u.user_id);

        //console.log(`getLastSessionTime: ${u.user_id} ${last} ${u.created_at}`);
        if (last)
          u.last_session = last;
        else
          u.last_session = u.created_at;
      }
    }
    return users;
  },

  async updateInfo(userId: string, name: string): Promise<UserModel> {
    return Auth0Api.updateInfo(userId, name);
  },

  async getStatTotal(): Promise<number> {
    return Auth0Api.getTotalUserCount();
  },

  async getStateAverage(numberOfDays: number): Promise<number> {
    return DbApi.getAverageActiveSession(numberOfDays);
  },
};
export default RepoUser;