import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { FormGroup, FormControl,ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { countryService } from "./country.service";

@Component({
  templateUrl: "./country.component.html"
})
export class countryComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  currentId: number;
  dtOptions: any = {};
  countries:  any[] = [];
  viewCountry: any[] =[];
  //singleRuleRequestData: any = {};

  cotForm: FormGroup;
  modalRef: NgbModalRef;
  dtTrigger: Subject<any> = new Subject();
  

  constructor(
    private cotSvc: countryService,
    private modalService: NgbModal,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      dom: "Bfrtip",
      lengthChange: true,
      buttons: ["copy", "print", "excel", "pdf"],
      responsive: true,
      order: [0, "asc"]
    };
    this.loadData();
    this.cotForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      capital: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  

  loadData() {
    this.cotSvc.getAllCountries().subscribe(
      res => {
        this.countries = res.data;
        if (this.datatableElement.dtInstance) {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          })
        } else {
          this.dtTrigger.next();
        }
      },
      (err: HttpErrorResponse) => {
        this.dtTrigger.next();
      });
  }
  addCountryRec(content){
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size: 'sm' });
  }
  submit(payload: any):void {
		this.modalRef.close();

		this.cotSvc.submitCot(payload).subscribe(
			res => {
				this.cotForm.reset();
				this.loadData();
			},
			(err: HttpErrorResponse) => {
}
		);
	}
  viewAction(content: any, id: number) {
    this.cotSvc.getSingleCountry(id).subscribe(
      res => {
        if (res.status) {
          this.viewCountry = res.data;
          this.modalRef = this.modalService.open(content, {
            ariaLabelledBy: "modal-basic-title",
            size: "lg"
          });
        }
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
