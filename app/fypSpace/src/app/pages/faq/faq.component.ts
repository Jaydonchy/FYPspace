import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    //admin||supervisor||student
    role!: string | null;

    faq_items: faq_item[] = [
        {
            heading: "I am unable to login to FYPBank, What should I do?",
            body: "Please email your details ( Your fullname, gender, student Id, APU/LBEF Email address, intake/class code, Programme/Course name ) to dhason@apu.edu.my / your Project manager." +
                "Please send your details as given below :" +
                "\n" +
                "For example, [ YOUR FULL NAME | MALE | TP000001 | TP00001@mail.apu.edu.my | UC3F1410 | BSc (Hons) in Computer Games Development ]." +
                "\n\n" +
                "Your FYPBaNK login a/c details will be emailed to your APU/LBEF Email address within 24-hour or 1-working-day" +
                ".",
            access_role: [
                "student",
                "supervisor",
                "admin"
            ]
        },
        {
            heading: "I couldn't find a suitable project proposal in the FYPBaNK. Can I develop a project proposal for myself?",
            body: "Yes you may",
            access_role: [
                "student",
            ]
        },
        {
            heading: "I am currently studying my RMCT module. Can I select a project proposal from the FYPBaNK?",
            body: "Yes you may",
            access_role: [
                "student",
            ]
        },
        {
            heading: "I have already selected a project proposal from the FYPBaNK. Can I select another project proposal from the same?",
            body: "Login to FYPBaNK,deselect the project proposal that you selected earlier. Wait for a minimum of 48-hour or 2-working-day, so that the concerned supervisor would approve your request. Once the supervisor has approved your request, you may search and select another project proposal from the same." +
                ".",
            access_role: [
                "student",
            ]
        },
        {
            heading: "I cannot view my student's PSF/PPF/Meeting Logs",
            body: "Contact your students to check if it is done or message admin for info",
            access_role: [
                "supervisor",
                "admin"
            ]
        },
        {
            heading: "I am unable to track supervisor's progress",
            body: "Contact mr Dhason to to reconfigure your account",
            access_role: [
                "admin",
            ]
        },

    ]

    roleCanAccess = (item : faq_item) =>{
        return item.access_role.includes(this.role!);
    }

    constructor(
        private _route: ActivatedRoute,
    ) { }


    ngOnInit(): void {
        this._route.paramMap.subscribe(params => {
            this.role = params.get('role');
        });
    };

}

export interface faq_item {
    heading: string,
    body: string,
    access_role: string[],
}
