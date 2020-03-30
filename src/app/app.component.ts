import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { UserAccountViewModel, RoleData } from './app.view-model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentTableData: UserAccountViewModel[] = [];
  roleMap: { [id: number]: RoleData };
  roleMapIdList: string[];
  currentAddingData: UserAccountViewModel;
  alertMessageForAdding: string;
  currentAlteringIndex: number;
  currentAlteringData: UserAccountViewModel;
  alertMessageForAltering: string;
  currentDeletingIndex: number;
  currentDeletingData: UserAccountViewModel;

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {
    this.getRoles();
    this.list();
  }

  getRoles() {
    this.roleMap = this.appService.getRoles();
    this.roleMapIdList = Object.keys(this.roleMap);
  }

  list() {
    this.currentTableData = this.appService.list();
  }

  openAddingDialog() {
    this.currentAddingData = {} as UserAccountViewModel;
  }

  doAdding(cancelButton: HTMLButtonElement) {
    this.alertMessageForAdding = null;
    const account = this.currentAddingData.Account;
    if (!this.alertMessageForAdding && !account) {
      this.alertMessageForAdding = '請輸入帳號';
    }
    if (!this.alertMessageForAdding && this.appService.exist(account)) {
      this.alertMessageForAdding = '帳號已存在';
    }
    const roleID = this.currentAddingData.RoleID;
    if (!this.alertMessageForAdding && !roleID) {
      this.alertMessageForAdding = '請選擇角色';
    }
    const name = this.currentAddingData.Name;
    if (!this.alertMessageForAdding && !name) {
      this.alertMessageForAdding = '請輸入性名';
    }
    const email = this.currentAddingData.Email;
    if (!this.alertMessageForAdding && !email) {
      this.alertMessageForAdding = '請輸入Email';
    }
    if (!this.alertMessageForAdding) {
      this.appService.add(new UserAccountViewModel(account, roleID, name, email));
      this.list();
      cancelButton.click();
    }
  }

  openAlteringDialog(index) {
    this.currentAlteringIndex = index;
    const data = this.currentTableData[index];
    this.currentAlteringData = {} as UserAccountViewModel;
    Object.keys(data).forEach(k => {
      this.currentAlteringData[k] = data[k];
    });
  }

  doAltering(cancelButton: HTMLButtonElement) {
    this.alertMessageForAltering = null;
    const name = this.currentAlteringData.Name;
    if (!this.alertMessageForAltering && !name) {
      this.alertMessageForAltering = '請輸入性名';
    }
    const email = this.currentAlteringData.Email;
    if (!this.alertMessageForAltering && !email) {
      this.alertMessageForAltering = '請輸入Email';
    }
    if (!this.alertMessageForAltering) {
      this.appService.alter(this.currentAlteringData);
      this.list();
      cancelButton.click();
    }
  }

  openDeletingDialog(index) {
    this.currentDeletingIndex = index;
    const data = this.currentTableData[index];
    this.currentDeletingData = {} as UserAccountViewModel;
    Object.keys(data).forEach(k => {
      this.currentDeletingData[k] = data[k];
    });
  }

  doDeleting(cancelButton: HTMLButtonElement) {
    this.appService.delete(this.currentDeletingData.Account);
    this.list();
    cancelButton.click();
  }
}
