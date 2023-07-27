import jwtdecode from 'jwt-decode';
const UtAuth = {
  getTypeFromSub(sub: string) {
    if (sub == null)
      return null;
    const result = sub.split('|');
    const type = result.length > 0 ? result[0] : null;
    return type;
  },
  getUidFromSub(sub: string) {
    if (sub == null)
      return null;
    const pattern = /\|(.+)/;
    const match = sub.match(pattern);
    const uid = match.length > 1 ? match[1] : null;
    return uid;
  },
  getUidFromJwt(id_token: string) {
    const decodedToken: any = jwtdecode(id_token);

    const sub = decodedToken.sub;
    //console.log(sub);
    const uid = UtAuth.getUidFromSub(sub);
    return uid;
  },
};
export default UtAuth;