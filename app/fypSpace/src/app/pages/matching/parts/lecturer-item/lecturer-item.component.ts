import { Component, Input, OnInit } from '@angular/core';
import { lecturer_item } from 'src/app/interfaces/list';
import { school } from 'src/app/interfaces/db_models';
import { LecturerService } from 'src/app/services/lecturer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-lecturer-item',
    templateUrl: './lecturer-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class LecturerItemComponent implements OnInit {

    @Input() item!: lecturer_item;
    @Input() isSelected = false;

    constructor(
        public _user: UserService,
        public _lecturer: LecturerService,
    ) { }


    ngOnInit(): void {
    }

}
