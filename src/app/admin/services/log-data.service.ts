import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {

constructor(private logger: NGXLogger, private http: HttpClient) { }

error(logData: object, Url: any, error:any) {
  this.logger.error(`${logData} --> ${error}`);
  this.http.post(Url, logData).subscribe(
    response => {
      console.log('Log data stored successfully:', response);
    },
    error => {
      console.error('Error storing log data:', error);
      alert("Error Occured");
    });
}
}
