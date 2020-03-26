import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseHandlerService } from '../../../_services/response-handler.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ServiceComponent } from '../../pages/default/services/service/service.component';
import { ThemeComponent } from '../../theme.component';


declare let mLayout: any;
@Component({
    selector: "app-modal-service",
    templateUrl: "./modal-service.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ModalServiceComponent implements OnInit, AfterViewInit {

  createServiceForm : FormGroup;
  public serviceData;
  public success_message;
  public response = false;
  public submitted = false;
  public  textareaValue;
  public textAreaError;

  constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder, private _ThemeComponent: ThemeComponent, private _ServiceComponent: ServiceComponent) { }

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
    ngAfterViewInit() {

        mLayout.initHeader();
    }
    serviceModalClick(){
      // (<any>$('.modalService')).modal('hide');
      (<any>$('.modalServices')).modal('show');

    }
    serviceModalClose(){
      (<any>$('.modalServices')).modal('hide');

    }


  createService(){
    //  this.textareaValue = (<any>$('.summernote')).summernote('code');
    this.submitted = true;
    if (this.createServiceForm.invalid) {
      return;
    }
    else {
      // this._ThemeComponent.loading = true;
      let serviceValues = this.createServiceForm.value;
    console.log(serviceValues);
    this._ResponseHandlerService.createServices(serviceValues).subscribe((res)=> {
      if(res.status){
        this._ServiceComponent.ngOnInit();
      (<any>$('.modalServices')).modal('hide')
      // this._ThemeComponent.loading = false;
    console.log(res);
    this.success_message = res.message;
    this.response = true;
    console.log(this.success_message);
    }
    else {
      // this._ThemeComponent.loading = false; 
    }
  }); 
}

}


  }