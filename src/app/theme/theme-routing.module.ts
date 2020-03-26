import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [

            {
                "path": "index",
                "loadChildren": "./pages/default/index/index.module#IndexModule"
            },

            {
                "path": "services",
                "loadChildren": "./pages/default/opportunities/opportunity/opportunity.module#OpportunityModule"
            },
            {
                "path": "services/services-detail",
                "loadChildren": "./pages/default/opportunities/opportunity-detail/opportunity-detail.module#OpportunityDetailModule"
            },
            
            {
                "path": "opportunity",
                "loadChildren": "./pages/default/services/service/service.module#ServiceModule"
            },
            {
                "path": "opportunity/opportunity-detail/:opportunityId",
                "loadChildren": "./pages/default/services/service-detail/service-detail.module#ServiceDetailModule"
            },


            {
                "path": "contacts",
                "loadChildren": "./pages/default/contacts/contact/contact.module#ContactModule"
            },
            {
                "path": "lead",
                "loadChildren": "./pages/default/leads/lead/lead.module#LeadModule"
            },
            {
                "path": "contacts/contacts-detail/:contactId",
                "loadChildren": "./pages/default/contacts/contact-detail/contact-detail.module#ContactDetailModule"
            },
            {
                "path": "404",
                "loadChildren": "./pages/default/not-found/not-found.module#NotFoundModule"
            },

            {
                "path": "",
                "redirectTo": "login",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "extra/login",
        "loadChildren": "./pages/extra/login/login.module#LoginModule"
    },
    {
        "path": "extra/error",
        "loadChildren": "./pages/extra/error/error.module#ErrorModule"
    },

    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }