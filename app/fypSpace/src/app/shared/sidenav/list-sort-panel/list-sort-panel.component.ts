import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sortOption } from 'src/app/interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';

@Component({
    selector: 'app-list-sort-panel',
    templateUrl: './list-sort-panel.component.html',
    styleUrls: ['./list-sort-panel.component.scss']
})
export class ListSortPanelComponent implements OnInit {

    @Input() sortOptions!: sortOption[]
    @Input() asc!: boolean
    @Output() selectedSortEmitter = new EventEmitter<sortOption>();
    @Output() ascEmitter = new EventEmitter<boolean>();

    constructor(
    ) { }

    assignSorter(event: sortOption) {
        this.selectedSortEmitter.emit(event);
    }
    ngOnInit(): void {
    }

}
