import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracing-page',
  templateUrl: './tracing-page.component.html',
  styleUrls: ['./tracing-page.component.css']
})
export class TracingPageComponent implements OnInit {

  fNumber = new FormControl('', [Validators.required, Validators.min(3), Validators.max(10)]);
  f0ID = new FormControl('', [Validators.required]);

  getErrorMessageF0ID(){
    return this.f0ID.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageFNumber() {
    if (this.fNumber.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.fNumber.hasError('min')) {
      return 'You must enter a value between 3 and 10';
    }

    return this.fNumber.hasError('max') ? 'You must enter a value between 3 and 10' : '';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
