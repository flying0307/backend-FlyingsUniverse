import Auth0Api from '@repo/auth0/auth0-api';

const RepoAuth = {
  async verifyEmail(userId: string): Promise<boolean> {
    try {
      const send = await Auth0Api.sendEmail(userId);
      return send;
    } catch (err) {
      console.error(err);
    }
    return false;
  },
};
export default RepoAuth;