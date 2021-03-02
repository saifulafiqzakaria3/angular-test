export class User {

  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date ) {}

  // Return token if not yet expired
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;  //login data already expired
    }
    return this._token;
  }

}
