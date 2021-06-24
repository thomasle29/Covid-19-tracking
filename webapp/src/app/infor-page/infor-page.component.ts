import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PersonLogInfo } from '../services/person/person.model';
import { PersonService } from '../services/person/person.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  Name: string;
  ID: string;
  Position: number;
  Phone: string;
  Birthyear: number;
}

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
  numberOfDate = new FormControl('14', [Validators.required, Validators.min(3)]);
  
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
      // console.log(this.personLogInfo);
      this.dataSource = new MatTableDataSource(this.personLogInfo);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.isLoading = false;
      this.snotify.error('Something went wrong, please try again! ', { timeout: 3000, position: SnotifyPosition.rightTop, });
    }, () => {
      this.isLoading = false;
    });
  }
}
