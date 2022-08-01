export interface IAuthUser {
  comparePassword(password: string): Promise<boolean>;
  [a: string]: any;
}

export default interface Authenticable {
  findByEmail(email: string): Promise<IAuthUser>;
}
