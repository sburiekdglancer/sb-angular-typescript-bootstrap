import { Component, OnInit, ViewEncapsulation, AfterViewInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { ResponseHandlerService } from '../../../../_services/response-handler.service';

@Injectable()

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./login.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    submitted = false;
    public loginBtnLoader = false;
    public errorMsg = false;
    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }

    constructor(private _script: ScriptLoaderService, private fb: FormBuilder, private _router: Router, private _ResponseHandlerService: ResponseHandlerService) {

    }
    ngOnInit() {


        // this._ResponseHandlerService.loginVarify().subscribe((res)=> {
        //     console.log(res);
        //     if (res.status){
        //         this._router.navigate(['/index']);            
        //         }
        //         else {
        //           localStorage.removeItem('token');
        //         }
        //   })


        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        })
    }
    ngAfterViewInit() {
        // this._script.loadScripts('.m-grid.m-grid--hor.m-grid--root.m-page',
        //     ['assets/snippets/custom/pages/user/login.js']);

        Helpers.bodyClass('m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default');

    }
    onSubmit() {
        this.submitted = true;
        this.loginBtnLoader = true;
        this.errorMsg = false;

        if (this.loginForm.invalid) {
            this.loginBtnLoader = false;

            return;
        }
        else {

            this._ResponseHandlerService.login(this.loginForm.value).subscribe((res) => {
                console.log(res);
                if (res.success) {
                    localStorage.setItem('token', res.access_token);
                      this._router.navigate(['/index']);
                    console.log(res);
                }
                else if(res.success == false) {
                    this.loginBtnLoader = false;
                    this.errorMsg = true;
                    console.log("fas");
                    //   this.loginBtnLoader = true; 
                    //   console.log(res);
                    //   this.errorMsg = true;
                    //   this.loginBtnLoader = false; 
                    

                    // console.log("email or password incorrect")
                }
            }

            )
        }
    }

}