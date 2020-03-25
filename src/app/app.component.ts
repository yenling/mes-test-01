import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

class TableData {
  Account = '';
  RoleID = '';
  Name = '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roleMap = {
    '1': { Text: '管理者', Color: 'primary' },
    '2': { Text: '維護者', Color: 'success' },
    '3': { Text: '操作員', Color: 'secondary' }
  };
  roleMapIdList = Object.keys(this.roleMap);
  currentTableData: TableData[] = [];

  ngOnInit(): void {
    let data = new TableData();
    data.Account = 'ANDY';
    data.RoleID = '1';
    data.Name = '吳安迪';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'MING';
    data.RoleID = '2';
    data.Name = '黃小明';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Mick';
    data.RoleID = '3';
    data.Name = '陳麥可';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Lee';
    data.RoleID = '3';
    data.Name = '李小龍';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Jack';
    data.RoleID = '2';
    data.Name = '吳傑克';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Joe';
    data.RoleID = '3';
    data.Name = '田喬梓';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Max';
    data.RoleID = '1';
    data.Name = '宋麥斯';
    this.currentTableData.push(data);
    data = new TableData();
    data.Account = 'Howard';
    data.RoleID = '3';
    data.Name = '林小豪';
    this.currentTableData.push(data);

    this.renewTableData();
  }

  renewTableData() {
    let html = '';
    for (let index = 0; index < this.currentTableData.length; index++) {
      let account = this.currentTableData[index].Account;
      let roleID = this.currentTableData[index].RoleID;
      let name = this.currentTableData[index].Name;
      html += '<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 my-3">'
        + '<div class="card">'
        + '<h5 class="card-header">' + account.toUpperCase() + ' <span class="badge badge-' + this.roleMap[roleID].Color + '">' + this.roleMap[roleID].Text + '</span></h5>'
        + '<div class="card-body">'
        + '<h5 class="card-title">' + name + '</h5>'
        + '<p class="card-text">' + account.toLowerCase() + '@eai.com.tw</p>'
        + '</div>'
        + '<div class="card-footer text-right">'
        + '<button type="button" class="btn btn-outline-success mr-1" data-toggle="modal" data-target="#divModalForAltering">'
        + '<i class="fas fa-edit"></i> 修改'
        + '</button>'
        + '<button type="button" class="btn btn-outline-danger ml-1" data-toggle="modal" data-target="#divModalForDeleting">'
        + '<i class="far fa-trash-alt"></i> 刪除'
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>';
    }
    let tableArea = document.getElementById("divDataArea");
    tableArea.innerHTML = html;
  }
}
