import { Injectable, Injector } from '@angular/core';

import { RoleData, RoleID, UserAccountViewModel } from './app.view-model';

@Injectable()
export class AppService {
  private initialUsers: UserAccountViewModel[] = [];

  constructor() {
    this.initialUsers.push(new UserAccountViewModel('ANDY', '1', '吳安迪', 'ANDY@abc.com'));
    this.initialUsers.push(new UserAccountViewModel('MING', '2', '黃小明', 'MING@cde.com'));
    this.initialUsers.push(new UserAccountViewModel('Mick', '3', '陳麥可', 'Mick@fgh.com'));
    this.initialUsers.push(new UserAccountViewModel('Lee', '3', '李小龍', 'Lee@ijk.com'));
    this.initialUsers.push(new UserAccountViewModel('Jack', '2', '吳傑克', 'Jack@lmn.com'));
    this.initialUsers.push(new UserAccountViewModel('Max', '1', '宋麥斯', 'Max@opq.com'));
    this.initialUsers.push(new UserAccountViewModel('Howard', '3', '林小豪', 'Howard@rst.com'));
  }

  getRoles(): { [id: number]: RoleData } {
    const roles = {};
    roles[RoleID.Maintainer] = new RoleData(RoleID.Maintainer, '管理者', 'primary');
    roles[RoleID.Manager] = new RoleData(RoleID.Manager, '維護者', 'success');
    roles[RoleID.Operator] = new RoleData(RoleID.Operator, '操作員', 'secondary');
    return roles;
  }

  list(): UserAccountViewModel[] {
    const array = [];
    this.initialUsers.forEach(vm => array.push(vm));
    return array;
  }

  exist(account: string) {
    return this.initialUsers.find(vm => vm.Account === account.toUpperCase());
  }

  add(viewModel: UserAccountViewModel) {
    this.initialUsers.push(viewModel);
    return true;
  }

  alter(viewModel: UserAccountViewModel) {
    const result = this.initialUsers.find(vm => vm.Account === viewModel.Account.toUpperCase());
    if (!result) { return false; }
    Object.keys(viewModel).forEach(k => {
      result[k] = viewModel[k];
    });
    return true;
  }

  delete(account: string) {
    const index = this.initialUsers.findIndex(vm => vm.Account === account.toUpperCase());
    if (index < 0) { return false; }
    this.initialUsers.splice(index, 1);
    return true;
  }
}
