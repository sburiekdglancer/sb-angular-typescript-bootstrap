import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import {ResponseHandlerService } from '../../../../../_services/response-handler.service'
import { Router } from '@angular/router';



@Component({
    selector: '.m-wrapper',
    templateUrl: './contact.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
    createContactForm : FormGroup;
    public username;
    public email;
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
  
    public alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; 
    constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private fb: FormBuilder) { }
   
    allContectDetail(data){
        this.allContacts = [];
        console.log(data);
        this.allContacts = data;
      }

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

      sorting(event){
        this.sortedData= [];
        for (let obj of this.allContactList){
          let events = event.toLowerCase();
          this.res = obj.name.toLowerCase().charAt(0).toLowerCase();
            if(this.res == events){
              this.activeClass = events;
               this.sortedData.push(obj);
            }
            else{
              this.activeClass= events;
            }
        }
        this.allContectDetail(this.sortedData);
      }
      allListButton(){
        this.activeClass = 'all';
        this.allContectDetail(this.allContactList);
    
      }
      createContact(){
        this.submitted = true;
        if (this.createContactForm.invalid) {
          return;
        }
        else {
        this._ResponseHandlerService.createContact(this.createContactForm.value).subscribe((res)=> {
          console.log(res);
          if(res.status){
            (<any>$('.modalContact')).modal('hide');
          }
        });
      }
    }
    gotoDetail(event){
        console.log(event);
        this._router.navigate(['/contacts/contacts-detail',event]);
      }      
        logout(){
          localStorage.removeItem('token');
          this._router.navigate(['/login']);
        }
}