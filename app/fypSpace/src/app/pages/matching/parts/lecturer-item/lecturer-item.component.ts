import { Component, Input, OnInit } from '@angular/core';
import { lecturer_item } from 'src/app/interfaces/list';
import { lecturer_question, school } from 'src/app/interfaces/db_models';
import { LecturerService } from 'src/app/services/lecturer.service';
import { UserService } from 'src/app/services/user.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
    selector: 'app-lecturer-item',
    templateUrl: './lecturer-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class LecturerItemComponent implements OnInit {

    @Input() item!: lecturer_item;
    @Input() isSelected = false;
    question = {
        involved_question: 0,
        supervisor_question: 0,
        taken_supervisor_question: 0,
        marker_question: 0,
        taken_marker_question: 0,
    }
    question_string = ``;


    constructor(
        public _user: UserService,
        public _lecturer: LecturerService,
        public _api: BackendService
    ) { }


    getQuestionByLecturer() {
        this._api.doGet<lecturer_question[]>(`/question/lecturer/${this.item.lecturer.lecturer_id}`)
            .then(obs => obs.subscribe({
                next: (res) => {
                    this.question.involved_question = res.length;
                    if (res.length > 0) {
                        res.forEach(question => {
                            if (question.supervisor_id == this.item.lecturer.lecturer_id) {
                                this.question.supervisor_question++;
                                if (question.student_id) this.question.taken_supervisor_question++;
                            } else if (question.marker_id == this.item.lecturer.lecturer_id) {
                                this.question.marker_question++;
                                if (question.student_id) this.question.taken_marker_question++;
                            }
                        })
                    }
                    this.composeQuestionTooltip();
                    return;
                },
                error: err => {
                    console.warn(`Unable to retrieve supervisor name : ${err}`);
                }
            }))
    }

    composeQuestionTooltip=()=> {
        this.question_string =
            `Involved question : ${this.question.involved_question}
        Question Supervisor : ${this.question.supervisor_question}
        Taken Question : ${this.question.taken_supervisor_question}
        Question Marker : ${this.question.marker_question}
        Taken Question : ${this.question.taken_marker_question}
        `
    }

    ngOnInit(): void {
        this.getQuestionByLecturer();
    }

}
