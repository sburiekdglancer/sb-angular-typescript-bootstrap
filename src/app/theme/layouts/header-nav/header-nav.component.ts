import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseHandlerService } from '../../../_services/response-handler.service';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  public username;
  public email; 


    constructor(private _router: Router, private _ResponseHandlerService: ResponseHandlerService) {

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

    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }
    logout(){
        localStorage.removeItem('token');
        this._router.navigate(['/extra/login']);
      }

}