import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit, OnDestroy {
  queries:any="";
  queryDisplay:boolean = true;
  queriesUrl = ApiUrl.queries;

  queryStatus = ['Pending', 'Addressed'];
  updateQueries:FormGroup;
  subscriptionData: Subscription[] |undefined = [];

  constructor(private http:HttpClient, private title:Title, private formBuilder:FormBuilder) {
    this.updateQueries = this.formBuilder.group({
      uid:[,Validators.required],
      queryStatus:[,Validators.required],
      id:[,Validators.required],
      addressingData:[,Validators.required]
    })
   }

  ngOnInit() {
    this.subscriptionData?.push(this.http.get(`${this.queriesUrl}`).subscribe((queryData:any)=>{
      this.queries = queryData;
    }));
    this.title.setTitle('Query | RK MART');
  }
  updateData(id:number){
    this.queryDisplay = false;
    this.subscriptionData?.push(this.http.get(`${this.queriesUrl}/${id}`).subscribe((queryData:any)=>{
      this.updateQueries.controls['uid'].setValue(queryData.uid);
      this.updateQueries.controls['queryStatus'].setValue(queryData.queryStatus);
      this.updateQueries.controls['id'].setValue(queryData.id);
      this.updateQueries.controls['addressingData'].setValue(queryData.addressingData||'');
    }));
    this.updateQueries.markAsPristine();
  }

  updateQueryStatus(status:any){
    if(!this.updateQueries.pristine && this.updateQueries.valid){
      this.subscriptionData?.push(this.http.patch(`${this.queriesUrl}/${status.id}`, status).subscribe((response:any)=>{
        if(response){
          alert("Updated Successfully");
        }
      }));
    }else{
      alert("Data Has not Modified Yet");
    }    
  }

  back(){
    this.queryDisplay = true;
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
