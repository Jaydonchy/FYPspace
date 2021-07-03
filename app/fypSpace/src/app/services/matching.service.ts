import { Injectable } from '@angular/core';
import { student_item, lecturer_item } from '../interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
    selectedLecturer?: lecturer_item;
    selectedStudent?: student_item;
  constructor() { }
}
