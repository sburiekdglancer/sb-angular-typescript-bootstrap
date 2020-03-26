import { Component, OnInit, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'; 
import {ResponseHandlerService } from '../../../../../_services/response-handler.service'
import { Router } from '@angular/router';



@Component({
    selector: '.m-wrapper',
    templateUrl: './service.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit {
    createOpportunityForm : FormGroup;
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
    public  allOpprtunityData ;

    constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder) { }

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

          // get opportunity detail 

          this._ResponseHandlerService.getOpportunity().subscribe((res)=>
          {
            if (res.status){
              this.allOpprtunityData = res.data;
              console.log(this.allOpprtunityData);
              }
                else {
                  console.log("");
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
             
          this.createOpportunityForm = this.fb.group({
            contact_id: [''],
            service_id:[''],
            contact_name: ['',[Validators.required]],
            service:['', [Validators.required]],
            description:[''],
          });
    }

    // hide(){
    //   (<any>$('#serviceModals')).modal('hide');
    //   (<any>$('.modal-backdrop')).remove();

    // }


    createOpportunity(){
      console.log(this.createOpportunityForm.value);
      this.submitted = true;
      if (this.createOpportunityForm.invalid) {
        return;
      }
      else {
        this.submitted = false;
    this._ResponseHandlerService.createOpportunity(this.createOpportunityForm.value).subscribe((res)=>{
    if(res.status){
      (<any>$('#serviceModal')).modal('hide');
      (<any>$('.modal-backdrop')).remove();

      this.ngOnInit();
      console.log(res);
    }
    else {
      (<any>$('#serviceModal')).modal('hide');
      (<any>$('.modal-backdrop')).remove();

    }
        })
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
      this.createOpportunityForm.patchValue({
        contact_id: contact.id,
        contact_name: contact.name,
        phone: contact.mobile,
        email: contact.email
      })
      this.contactSuggestionList = false;

      console.log(contact);
    }

    dealInfoSetter(event,service){
      this.createOpportunityForm.patchValue({
        service_id: service.id,
        service: service.name,
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

        gotoDetail(event){
          console.log(event);
          this._router.navigate(['/opportunity/opportunity-detail',event]);
        }

  }