import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  phone: string;
  birthyear: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nguyen Thi Anh', phone: '0922596541', birthyear: 1999},
  {position: 2, name: 'Quach Van Dang', phone: '0164258654', birthyear: 2000},
  {position: 3, name: 'Tran Thi Mi', phone: '0865254369', birthyear: 1998},
  {position: 4, name: 'Le Loi', phone: '0947856321', birthyear: 1800},
  {position: 5, name: 'Quang Trung', phone: '0845963214', birthyear: 1568},
  {position: 6, name: 'Nguyen Hue', phone: '0195321456', birthyear: 1489},
  {position: 7, name: 'Ngo Quyen', phone: '0894325654', birthyear: 1234},
  {position: 8, name: 'Tran Quoc Toan', phone: '0215321456', birthyear: 1254},
  {position: 9, name: 'Hung Vuong', phone: '0954654123', birthyear: 1111},
  {position: 10, name: 'Tran Hung Dao', phone: '0987258145', birthyear: 1905},
];

@Component({
  selector: 'app-infor-page',
  templateUrl: './infor-page.component.html',
  styleUrls: ['./infor-page.component.css']
})

export class InforPageComponent implements OnInit {

  value = '';

  displayedColumns: string[] = ['position', 'name', 'phone', 'birthyear'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
