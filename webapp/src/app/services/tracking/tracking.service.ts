import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';
import { map } from 'rxjs/operators';
import { Response } from '../response.model';
import { TrackingLog } from './tracking.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TrackingService {
    private jsonConvert: JsonConvert = new JsonConvert();

    constructor(
      private http: HttpClient
    ) { }

    getTracking(personID: string, numberOfF: number, numberOfDate: number): Observable<Response<TrackingLog[]>>{
        return this.http.post<Response<TrackingLog[]>>(
            `${environment.BASE_URL}/tracking`,
            {
                'id' : personID,
                'number-of-f': numberOfF,
                'number-of-date': numberOfDate,
            }
            ).pipe(map(resp => {
                if (resp.returncode !== 1) {
                    return resp;
                }
                if (resp.data) {
                    resp.data = resp.data.map(item => this.jsonConvert.deserializeObject(item, TrackingLog));
                }
                return resp;
            }));
    }
    
}
