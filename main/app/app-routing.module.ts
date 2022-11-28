import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCrudComponent } from './test-crud/test-crud.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'',redirectTo:'test',pathMatch:'full'},
  {path:'test',component:TestComponent},
  {path:'testCrud',component: TestCrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
