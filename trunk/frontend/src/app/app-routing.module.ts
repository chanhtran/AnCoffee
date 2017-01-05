import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMenuComponent } from './page/menu/add-menu.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'add-menu', component: AddMenuComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }