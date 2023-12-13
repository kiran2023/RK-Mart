import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from "ngx-logger";
import { ApiUrl, serverError } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private logger: NGXLogger, private http: HttpClient) { }

  info(logData: object, Url: any) {
    this.logger.info(logData);
    this.http.post(Url, logData).subscribe(
      response => {
        console.log('Log data stored successfully:', response);
      },
      error => {
        console.error('Error storing log data:', error);
      });
  }

  warn(logData: any, Url: any) {
    this.logger.warn(logData.message);

    this.http.post(Url, logData).subscribe(
      response => {
        console.log('Log data stored successfully:', response);
      },
      error => {
        console.error('Error storing log data:', error);
      });
  }

  error(logData: any, Url: any) {
    this.logger.error(logData.message);

    this.http.post(Url, logData).subscribe(
      response => {
        console.log('Log data stored successfully:', response);
      });
  }

  fetchError(error:any){
    this.logger.error(error);

    let logDataFetched = serverError;
    logDataFetched.message = `Server Down : ${JSON.stringify(error)}`;

    this.error(logDataFetched, ApiUrl.errorLogUrl);
    alert("Server Down Check Back Later");
  }

}
