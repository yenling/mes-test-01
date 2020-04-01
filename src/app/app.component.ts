import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserAccountViewModel, RoleData } from './app.view-model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  currentTableData: UserAccountViewModel[] = [];
  roleMap: { [id: number]: RoleData };
  roleMapIdList: string[];
  currentAddingData: UserAccountViewModel;
  alertMessageForAdding: string;
  buttonDisabledForAdding = false;
  currentAlteringIndex: number;
  currentAlteringData: UserAccountViewModel;
  alertMessageForAltering: string;
  buttonDisabledForAltering = false;
  currentDeletingIndex: number;
  currentDeletingData: UserAccountViewModel;
  buttonDisabledForDeleting = false;
  modalConfig = {
    ignoreBackdropClick: true,
    keyboard: false,
  };

  constructor(public appService: AppService, private modalService: BsModalService) {

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

  openAddingDialog(modalTemplate: TemplateRef<any>) {
    this.currentAddingData = {} as UserAccountViewModel;
    this.buttonDisabledForAdding = false;
    this.modalRef = this.modalService.show(modalTemplate, this.modalConfig);
  }

  doAdding() {
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
      this.buttonDisabledForAdding = true;
      this.appService.add(new UserAccountViewModel(account, roleID, name, email));
      this.list();
      this.modalRef.hide();
    }
  }

  openAlteringDialog(index: number, modalTemplate: TemplateRef<any>) {
    this.currentAlteringIndex = index;
    const data = this.currentTableData[index];
    this.currentAlteringData = {} as UserAccountViewModel;
    Object.keys(data).forEach(k => {
      this.currentAlteringData[k] = data[k];
    });
    this.buttonDisabledForAltering = false;
    this.modalRef = this.modalService.show(modalTemplate, this.modalConfig);
  }

  doAltering() {
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
      this.buttonDisabledForAltering = true;
      this.appService.alter(this.currentAlteringData);
      this.list();
      this.modalRef.hide();
    }
  }

  openDeletingDialog(index, modalTemplate: TemplateRef<any>) {
    this.currentDeletingIndex = index;
    const data = this.currentTableData[index];
    this.currentDeletingData = {} as UserAccountViewModel;
    Object.keys(data).forEach(k => {
      this.currentDeletingData[k] = data[k];
    });
    this.buttonDisabledForDeleting = false;
    this.modalRef = this.modalService.show(modalTemplate, this.modalConfig);
  }

  doDeleting() {
    this.buttonDisabledForDeleting = true;
    this.appService.delete(this.currentDeletingData.Account);
    this.list();
    this.modalRef.hide();
  }
}
