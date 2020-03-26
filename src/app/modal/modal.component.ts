import { Component, OnInit, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'; 
import {ResponseHandlerService } from '../_services/response-handler.service'
import { Router } from '@angular/router';



@Component({
    selector: '.m-wrapper',
    templateUrl: './modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
    createLeadForm : FormGroup;
    public contactSuggestionList = false;
    public serviceSuggestionList = false;
    public  clicked = false;
    public DealTitleClicked = false;
    public contactData;
    public allLeadData;
    public values;
    public username;
    public email;
    public allContacts = [];
    public allContactList = [];
    public activeClass ='all';
    public sortedData = [];
    public res;
    public text: string ;
    public ServiceText: string;
    public submitted = false;
    public contactNames = [];
    public allContactData ;
    public allContactDataForElse;
    public allServiceData;
    public allServiceDataForElse;
    public serviceData;

    constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder) { }
   
    // allContectDetail(data){
    //     this.allContacts = [];
    //     console.log(data);
    //     this.allContacts = data;
    //   }

      // get full_name(){
      //   return this.createContactForm.get('full_name');
      // }

    ngOnInit() {
        this._ResponseHandlerService.getToken().subscribe((res)=> {
            // console.log(res);
            if (res.status){
                  this.username = res.data.username;
                  this.email = res.data.email;            
                }
                else {
                  localStorage.removeItem('token');
                  this._router.navigate(['/extra/login']);
                }
          })
          
        
          this._ResponseHandlerService.getLeadDetails().subscribe((res)=>
          {
            if (res.status){
              this.allLeadData = res.data;
              this.allContactData = res.contacts;
              this.allContactDataForElse = res.contacts;
              this.contactData = this.allContactData;


              this.allServiceData = res.services;
              this.allServiceDataForElse = res.services;
              this.serviceData = this.allServiceData;
              // console.log(res);
              console.log(this.allContactData);
                 }
                else {
                  console.log("invalid token");
                }
          })
        
          this.createLeadForm = this.fb.group({
            contact_id: [''],
            service_id:[''],
            contact_person_name: ['',[Validators.required]],
            organization_name: ['', [Validators.required]],
            deal_title:['', [Validators.required]],
            deal_value:['', [Validators.required]],
            currency:['', [Validators.required]],
            pipeline:['', [Validators.required]],
            site_address:['',[Validators.required]],
            job_description:['',[Validators.required]],
            phone:['',[Validators.required]],
            fax:['',[Validators.required]],
            email:['',[Validators.required]],
            address:['',[Validators.required]]                   
          });
    }

    createLead(){
      console.log(this.createLeadForm.value);
      this.submitted = true;
      if (this.createLeadForm.invalid) {
        return;
      }
      else {
        this._ResponseHandlerService.createLead(this.createLeadForm.value).subscribe((res)=> {
          (<any>$('.modal')).modal('hide')
          console.log(res);
          this.ngOnInit();
        });
      }
     }

     search(event:any) { 
      this.clicked = true;
       console.log(this.text);
       if(this.text !=""){

       this.contactData = this.allContactData.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.text.toLocaleLowerCase());
      });
    }
    else {
      this.contactData = this.allContactDataForElse;
      }
    }

    contactInfoSetter(event,contact){
      this.createLeadForm.patchValue({
        contact_id: contact.id,
        contact_person_name: contact.name,
        phone: contact.mobile,
        email: contact.email
      })
      this.contactSuggestionList = false;

      console.log(contact);
    }

    dealInfoSetter(event,service){
      this.createLeadForm.patchValue({
        service_id: service.id,
        deal_title: service.name,
      });
      this.serviceSuggestionList = false;

    }

    ServiceSearch(event:any) { 
      this.DealTitleClicked = true;
       console.log(this.ServiceText);
       if(this.ServiceText !=""){

       this.serviceData = this.allServiceData.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.ServiceText.toLocaleLowerCase());
      });
    }
    else {
      this.serviceData = this.allServiceDataForElse;
      }
    }
    contactSuggestion(){
  this.contactSuggestionList = true;
    }
    closeContactSuggestionList(){
      this.contactSuggestionList = false;

    }
    serviceSuggestion(){
      this.serviceSuggestionList = true;
        }
      
        closeServiceSuggestionList(){
          this.serviceSuggestionList = false;
    
        }

  }