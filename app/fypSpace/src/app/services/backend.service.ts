import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    constructor(
        private _http: HttpClient
    ) { }

    private root = "http://localhost:3000/api";

    appendRoute(route: string): string {
        return `${this.root}${route}`;
    }

    doGet<T>(route: string): Observable<T>{
        return this._http.get<T>(this.appendRoute(route));
    }

    doPost(route: string, body : any) {
        return this._http.post(this.appendRoute(route),body);
    }
}
