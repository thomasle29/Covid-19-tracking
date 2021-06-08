import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PersonLogInfo } from '../services/person/person.model';
import { PersonService } from '../services/person/person.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

export interface PeriodicElement {
  Name: string;
  ID: string;
  Position: number;
  Phone: string;
  Birthyear: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Position: 1, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Nguyen Thi Anh', Phone: '0922596541', Birthyear: 1999},
  {Position: 2, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Quach Van Dang', Phone: '0164258654', Birthyear: 2000},
  {Position: 3, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Tran Thi Mi', Phone: '0865254369', Birthyear: 1998},
  {Position: 4, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Le Loi', Phone: '0947856321', Birthyear: 1800},
  {Position: 5, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Quang Trung', Phone: '0845963214', Birthyear: 1568},
  {Position: 6, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Nguyen Hue', Phone: '0195321456', Birthyear: 1489},
  {Position: 7, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Ngo Quyen', Phone: '0894325654', Birthyear: 1234},
  {Position: 8, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Tran Quoc Toan', Phone: '0215321456', Birthyear: 1254},
  {Position: 9, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Hung Vuong', Phone: '0954654123', Birthyear: 1111},
  {Position: 10, ID: 'ddc44d43-c371-11eb-9a1e-42010ab80002', Name: 'Tran Hung Dao', Phone: '0987258145', Birthyear: 1905},
];

@Component({
  selector: 'app-infor-page',
  templateUrl: './infor-page.component.html',
  styleUrls: ['./infor-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class InforPageComponent implements OnInit {

  constructor(
    private personService: PersonService,
    private snotify: SnotifyService,
  ) {
  }

  value = '';
  personLogInfo: PersonLogInfo[] = [];
  isLoading = false;
  errorMessage: string;
  numberOfDate = new FormControl('5', [Validators.required, Validators.min(3)]);
  columnsToDisplay: string[] = ['Name', 'Phone', 'Birthyear'];
  columnsToDisplayRow: string[] = ['personName', 'personPhone', 'personAddress', 'personYear'];
  expandedElement: PersonLogInfo | null;
  dataSource = new MatTableDataSource(this.personLogInfo);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getErrorMessageNumberOfDate() {
    if (this.numberOfDate.hasError('required')) {
      return 'You must enter a value';
    }

    return this.numberOfDate.hasError('min') ? 'You must enter a value > 3' : '';
  }

  ngOnInit(): void {
    this.refreshReport();
  }

  refreshReport(): void {
    this.errorMessage = null;
    this.isLoading = true;
    this.personService.getInfoPersonByDate(this.numberOfDate.value).subscribe(resp => {
      if (resp.returncode !== 1) {
        this.errorMessage = 'Cannot get detail visitor';
        return this.snotify.error(this.errorMessage, { timeout: 3000, position: SnotifyPosition.rightTop, });
      }
      this.personLogInfo = resp.data;
      console.log(this.personLogInfo);
      this.dataSource = new MatTableDataSource(this.personLogInfo);
    }, err => {
      this.isLoading = false;
      this.snotify.error('Something went wrong, please try again! ', { timeout: 3000, position: SnotifyPosition.rightTop, });
    }, () => {
      this.isLoading = false;
    });
  }
}
