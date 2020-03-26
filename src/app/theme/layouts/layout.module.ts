import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { AsideLeftMinimizeDefaultEnabledComponent } from '../pages/aside-left-minimize-default-enabled/aside-left-minimize-default-enabled.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DefaultComponent } from '../pages/default/default.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
// import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../_directives/unwrap-tag.directive';
import { ResponseHandlerService } from '../../_services/response-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ModalServiceComponent } from './modal-service/modal-service.component';


@NgModule({
    declarations: [
        LayoutComponent,
        AsideLeftMinimizeDefaultEnabledComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        // TooltipsComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        ModalComponent,
        ModalServiceComponent,
       
        
    ],
    exports: [
        LayoutComponent,
        AsideLeftMinimizeDefaultEnabledComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        // TooltipsComponent,
        HrefPreventDefaultDirective,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ModalComponent,
        ModalServiceComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [ResponseHandlerService],

})
export class LayoutModule {
}