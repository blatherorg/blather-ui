export class User {
  constructor(
    public handle: string,
    public email: string,
    public firstName: string,
    public lastName: string) {}
}

export class EditUser {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string) {}
}

export interface RegisterUser {
  handle: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface FollowingUser {
  handle: string;
  email: string;
}
