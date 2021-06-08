import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';
import { map } from 'rxjs/operators';
import { Response } from '../response.model';
import { PersonLogInfo } from './person.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PersonService {
    private jsonConvert: JsonConvert = new JsonConvert();

    constructor(
      private http: HttpClient
    ) { }

    getInfoPersonByDate(numberOfDate: string): Observable<Response<PersonLogInfo[]>>{
        return this.http.get<Response<PersonLogInfo[]>>(
            `${environment.BASE_URL}/person/logs/${numberOfDate}`
            ).pipe(map(resp => {
                if (resp.returncode !== 1) {
                    return resp;
                }
                if (resp.data) {
                    resp.data = resp.data.map(item => this.jsonConvert.deserializeObject(item, PersonLogInfo));
                }
                return resp;
            }));
    }
}
