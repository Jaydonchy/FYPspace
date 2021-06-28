import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
      
  }


}

interface student {
    name:string,
    intake: string,
    school: string,
    topic: string,
}