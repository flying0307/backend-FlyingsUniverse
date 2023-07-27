import UtTime from '@utils/ut-time';
import axios, { HttpStatusCode } from 'axios';
import { UserModel } from '@model/user-model';
import UserResponse from '@repo/auth0/data/user-response';
import { StatModel } from '@model/stat-model';

const Auth0Api = {
  async getToken(): Promise<string | null> {
    try {
      const response = await axios.post(
        `https://${process.env.AUTH_HOST_NAME}/oauth/token`,
        {
          client_id: process.env.AUTH_CLIENT_ID,
          client_secret: process.env.AUTH_SECRET,
          audience: process.env.AUTH_AUDIENCE,
          grant_type: 'client_credentials',
        },
      );

      const accessToken = response.data.access_token;
      //console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      return null;
    }

  },

  async getUser(id: string): Promise<UserModel | null> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;

      const response = await axios.get(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status == HttpStatusCode.Ok) {
        return UserResponse.toUserModel(response.data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getUsers(): Promise<UserModel[] | null> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;
      const response = await axios.get(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status == HttpStatusCode.Ok) {
        return response.data.map(UserResponse.toUserModel);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async sendEmail(userId: string): Promise<boolean> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;
      const response = await axios.post(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/jobs/verification-email`,
        {
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status == HttpStatusCode.Created) {
        return true;
      } else
        return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updatePassword(userId: string, newPwd: string): Promise<boolean> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;
      const response = await axios.patch(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/users/${userId}`,
        {
          password: newPwd,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status == HttpStatusCode.Ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async updateInfo(userId: string, name: string): Promise<UserModel | null> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;
      const response = await axios.patch(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/users/${userId}`,
        {
          name: name,
          nickname: name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status == HttpStatusCode.Ok) {
        return UserResponse.toUserModel(response.data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getTotalUserCount(): Promise<number> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;
      const response = await axios.get(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            per_page: 1,
            include_totals: true,
          },
        },
      );

      if (response.status == HttpStatusCode.Ok) {
        const totalUserCount = response.data.total;
        return totalUserCount;
      } else {
        return 0;
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  },

  async getAverageLoginsAndSignups(numberOfDays: number): Promise<StatModel> {
    try {
      const accessToken = await Auth0Api.getToken();
      if (accessToken == null)
        return null;

      const { pastDateString, today } = UtTime.getPastDayToday(numberOfDays);
      const statsResponse = await axios.get(
        `https://${process.env.AUTH_HOST_NAME}/api/v2/stats/daily`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            from: pastDateString,
            to: today,
          },
        },
      );
      const stats = statsResponse.data;
      const totalLogins = stats.reduce(
        (sum: number, stat: any) => sum + stat.logins,
        0,
      );
      const totalSignups = stats.reduce(
        (sum: number, stat: any) => sum + stat.signups,
        0,
      );

      let noDays = numberOfDays;
      if (numberOfDays <= 0) noDays = 1;
      const averageLogins = totalLogins / noDays;
      const averageSignups = totalSignups / noDays;
      return {
        average_logins: averageLogins,
        average_signups: averageSignups,
      } as StatModel;
    } catch (error) {
      console.error(error);
      return {
        average_logins: 0,
        average_signups: 0,
      } as StatModel;
    }
  },
};

export default Auth0Api;
