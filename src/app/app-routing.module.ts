import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SpottedComponent } from './spotted/spotted.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: "home", component: MainComponent },
  { path: "spotted", component: SpottedComponent },
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
