import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseHandlerService } from '../../../../../_services/response-handler.service';

@Component({
    selector: '.m-wrapper',
    templateUrl: './lead-detail.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LeadDetailComponent implements OnInit {

    public username;
    public email;
    public routeSub;
    public id;
    public ContactResponseData = {data:{},billing_address:{},service_address:{}};
    constructor(private _ResponseHandlerService: ResponseHandlerService, private _router :Router, private route: ActivatedRoute) { }

    ngOnInit() {

        this._ResponseHandlerService.getToken().subscribe((res)=> {
            console.log(res);
            if (res.status){
                  this.username = res.data.username;
                  this.email = res.data.email;            
                }
                else {
                  localStorage.removeItem('token');
                  this._router.navigate(['/login']);
                }
          })
      
          this.routeSub = this.route.params.subscribe(params => {
            this.id = params['contactId'];
            console.log(this.id);
          });
          console.log(this.id);
          this._ResponseHandlerService.getContactDetail(this.id).subscribe((res)=> {
            this.ContactResponseData = res;
            console.log(this.ContactResponseData);
          });

    }
    logout(){
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
      }
}