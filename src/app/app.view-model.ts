export class RoleData {
  ID: number;
  Text: string;
  Color: string;

  constructor(id: number, text: string, color: string) {
    this.ID = id;
    this.Text = text;
    this.Color = color;
  }
}

export const enum RoleID {
  Maintainer = 1,
  Manager = 2,
  Operator = 3,
}

export class UserAccountViewModel {
  Account: string;
  RoleID: string;
  Name: string;
  Email: string;

  constructor(account: string, roleID: string, name: string, email: string) {
    this.Account = account.toUpperCase();
    this.RoleID = roleID;
    this.Name = name;
    this.Email = email;
  }
}
