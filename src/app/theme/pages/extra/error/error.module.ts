import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { LayoutModule } from '../../../layouts/layout.module';

const routes: Routes = [
    {
        "path": "",
        "component": ErrorComponent
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        ErrorComponent
    ]
})
export class ErrorModule {



}