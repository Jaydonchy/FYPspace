import { Injectable } from '@angular/core';
import { assignmentView } from '../interfaces/db_models';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(
      private _api:BackendService,
  ) { }

  getAssignmentView(assignment_id:number){
      return this._api.doGet<assignmentView[]>(`/assignment/view/${assignment_id}`)
  }
  
}
