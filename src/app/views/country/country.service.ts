import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class countryService {
  apiUrl: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  /////////////////////// country DETAILS /////////////////////////////////

  // AddBranches(payload: any): Observable<any> {
  //   return this.http.post<any>(
  //     this.apiUrl + "RelationshipMgmt/UpdateFirmDetails",
  //     payload
  //   );
  // }

  // getPersonWithId(Id: number): Observable<any> {
  //   return this.http.get<any>(this.apiUrl + `Persons/ByPersonId/${Id}`);
  // }
  submitCot(payload: any): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'Country/Add', payload);
  }
  getAllCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Country/All");
  }

  
}
