import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { LeadDetailComponent } from './lead-detail.component';
import { ResponseHandlerService } from '../../../../../_services/response-handler.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': LeadDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ], exports: [
        RouterModule,
    ], 
    providers: [ResponseHandlerService],
    declarations: [
        LeadDetailComponent,
    ],
})
export class LeadDetailModule {
}   