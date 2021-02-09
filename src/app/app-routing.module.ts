import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {QueryComponent} from './query/query.component';
import {ErdComponent} from './erd/erd.component';
import {DesignComponent} from './design/design.component';

const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'home'},
  {path: 'home', component: HomeComponent},
  {path: 'query', component: QueryComponent},
  {path: 'erd', component: ErdComponent},
  {path: 'design', component: DesignComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
