import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { countryComponent } from './country.component';
import { countryRoutingModule } from './country-routing.module';

@NgModule({
  imports: [
    countryRoutingModule,
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [ countryComponent ]
})
export class countryModule { }
