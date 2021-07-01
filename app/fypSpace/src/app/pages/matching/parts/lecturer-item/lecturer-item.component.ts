import { Component, Input, OnInit } from '@angular/core';
import { lecturer_item } from 'src/app/interfaces/matching';

@Component({
    selector: 'app-lecturer-item',
    templateUrl: './lecturer-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class LecturerItemComponent implements OnInit {

    @Input() item?: lecturer_item | null;
    constructor() { }

    ngOnInit(): void {
    }

}
