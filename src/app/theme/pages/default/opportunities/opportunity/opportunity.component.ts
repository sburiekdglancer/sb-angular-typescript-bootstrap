import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ResponseHandlerService } from '../../../../../_services/response-handler.service';

@Component({
    selector: '.m-wrapper',
    templateUrl: './opportunity.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class OpportunityComponent implements OnInit {

 createServiceForm : FormGroup;
  public serviceData;
  public success_message;
  public response = false;
  public submitted = false;
  public  textareaValue;
  public textAreaError;


  constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder) { }



    ngOnInit() {

        // this._script.loadScripts('app-services',
        // ['assets/app/js/forms/widgets/summernote.js']);
        this.createServiceForm = this.fb.group({
          name: ['', [Validators.required]],
          scope: [''],
          price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
          tax: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        });
    
        this._ResponseHandlerService.getServices().subscribe((res)=> {
          console.log(res.data);
          this.serviceData=res.data;
        });
    }

    createService(){
        //  this.textareaValue = (<any>$('.summernote')).summernote('code');
        this.submitted = true;
        if (this.createServiceForm.invalid) {
          return;
        }
        else {
        // let textareaValue = (<any>$('.summernote')).summernote('code');
        // console.log(textareaValue);
        let serviceValues = this.createServiceForm.value;
        // serviceValues.scope = textareaValue
        console.log(serviceValues);
        this._ResponseHandlerService.createServices(serviceValues).subscribe((res)=> {
          (<any>$('.modal')).modal('hide')
        console.log(res);
        this.success_message = res.message;
        this.response = true;
        console.log(this.success_message);
        this.ngOnInit();
      }); 
  }

    }
    logout(){
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
      }
}