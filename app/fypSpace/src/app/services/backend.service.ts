import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    constructor(
        private _http: HttpClient
    ) { }

    private root = "http://localhost:3000/api";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    appendRoute(route: string): string {
        return `${this.root}${route}`;
    }

    async doGet<T>(route: string): Promise<Observable<T>> {
        const res = await this._http.get<T>(this.appendRoute(route))
            .pipe(
                catchError(this.handleError)
            );
        return res;
    }

    async doPost(route: string, body: any): Promise<Observable<Object>> {
        const res = await this._http.post(this.appendRoute(route), body, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        return res;
    }

    handleError(err: HttpErrorResponse) {
        if (err.status === 0) {
            //Client side network error
            return throwError('Client Network Error')
        } else {
            //Backend return unsuccessful response code
            //Return observable
            return throwError(`Response (${err.status}) : ${err.error.message}`);
        }
    }
}
