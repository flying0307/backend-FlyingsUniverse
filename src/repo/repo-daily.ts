import DbApi from '@db/db-api';

const RepoDaily = {
  async activeSession(uid: string): Promise<boolean> {
    return DbApi.activeSession(uid);
  },
};
export default RepoDaily;