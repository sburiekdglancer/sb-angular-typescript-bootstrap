import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseHandlerService } from '../../../_services/response-handler.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ServiceComponent } from '../../pages/default/services/service/service.component';
import { ThemeComponent } from '../../theme.component';


declare let mLayout: any;
@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit {
  public username;
  public email; 
  createContactForm : FormGroup;
  public allContectDetail;
  public allContacts = [];
  public allContactList = [];
  public activeClass ='all';
  public sortedData = [];
  public res;
  public submitted = false;
  contact_type="person";
  public same_as_above="yes";
  public same_as_above_radio;
  public same_as_above_result;
  constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder, private _Service: ServiceComponent, private _ThemeComponent: ThemeComponent) { }

  get full_name(){
    return this.createContactForm.get('full_name');
  }
    ngOnInit() {


      this._ResponseHandlerService.getToken().subscribe((res)=> {
        console.log(res);
        if (res.status){
              this.username = res.data.username;
              this.email = res.data.email;            
            }
            else {
              localStorage.removeItem('token');
              this._router.navigate(['/extra/login']);
            }
      })
      
    
      this._ResponseHandlerService.getContactDetails().subscribe((res)=>
      {
        if (res.status){
          this.allContactList = res.data;
          console.log(this.allContactList);
          this.allContectDetail(this.allContactList);
            }
            else {
              console.log("invalid token");
            }
      })
    
      this.createContactForm = this.fb.group({
          email: ['',[Validators.required, Validators.email]],
          full_name: ['', [Validators.required]],
          primary_phone:['', [Validators.required]],
          alternate_phone:['', [Validators.required]],
          mobile:['', [Validators.required]],
          fax:['', [Validators.required]],
          service_address_1:['',[Validators.required]],
          service_address_2:['',[Validators.required]],
          service_city:['',[Validators.required]],
          service_state:['',[Validators.required]],
          service_zip:['',[Validators.required]],
          service_country:['',[Validators.required]],
          same_as_above:[''],
          billing_address_1:[''],
          billing_address_2:[''],
          billing_city:[''],
          billing_state:[''],
          billing_zip:[''],
          billing_country:[''],
          contact_type:['']
        });



    }
    ngAfterViewInit() {

        mLayout.initHeader();
    }
    contactModalClick(){
      // (<any>$('.modalService')).modal('hide');
      (<any>$('.modalContact')).modal('show');

    }
    contactModalClose(){
      (<any>$('.modalContact')).modal('hide');

    }

    onChanges(event){
      this.same_as_above_radio = event.target.value;
      if(this.same_as_above_radio == "yes")
        {
          this.same_as_above_result = false;
        }
        else{
          this.same_as_above_result = true;
        }
    }

    status: boolean = false;
    clickEvent(){
        this.status = !this.status;       
    }
    createContact(){
      this.submitted = true;
      if (this.createContactForm.invalid) {
        return;
      }
      else {
        // this._ThemeComponent.loading = true;
      this._ResponseHandlerService.createContact(this.createContactForm.value).subscribe((res)=> {
if(res.status){
  (<any>$('.modalContact')).modal('hide');
  this._Service.ngOnInit();
  // this._ThemeComponent.loading = false;
}
else {
  // this._ThemeComponent.loading = false;

}      
});
    }
  }
  }