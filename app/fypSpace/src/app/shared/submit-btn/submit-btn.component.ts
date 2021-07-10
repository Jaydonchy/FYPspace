import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent implements OnInit {

  constructor() { }

  @Input() formSubmitting?:boolean;
  @Input() btnName!:string;

  ngOnInit(): void {
  }

}
