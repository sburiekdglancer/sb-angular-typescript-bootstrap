import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseHandlerService } from '../../../../../_services/response-handler.service';

@Component({
    selector: '.m-wrapper',
    templateUrl: './service-detail.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ServiceDetailComponent implements OnInit {

    public username;
    public email;
    public routeSub;
    public id;
    public OpportunityData = {data:{}};
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
            this.id = params['opportunityId'];
            console.log(this.id);
          });
          this._ResponseHandlerService.getOpportunityDetail(this.id).subscribe((res)=> {
            this.OpportunityData = res;
            console.log(this.OpportunityData);
          });

    }
   
}