import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ResponseHandlerService } from '../../../../_services/response-handler.service';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
    {
        "path": "",
        "component": LoginComponent
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ], exports: [
        RouterModule
    ],
    providers: [ResponseHandlerService],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {



}