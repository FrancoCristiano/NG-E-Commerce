import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { HomeComponent } from './home/home.component';
import { ItemSingleByIdComponent } from './item-single-by-id/item-single-by-id.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserPageComponent } from './user-page/user-page.component';
import { WorkWithUsComponent } from './work-with-us/work-with-us.component';

const routes: Routes = [
  //Qui specifico le rotte, sono oggetti JS
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'ShoppingCart',
    canActivate: [AuthGuardServiceService],
    component: ShoppingCartComponent,
  },
  { path: 'Login', component: LoginComponent },
  { path: 'registrati', component: RegisterComponent },
  {
    path: 'userPage',
    canActivate: [AuthGuardServiceService],
    component: UserPageComponent,
  },
  {
    path: 'productDetails',
    component: ProductDetailsComponent,
    children: [{ path: ':id', component: ItemSingleByIdComponent }],
  },
  {
    path: 'WorkWithUs',
    canActivate: [AuthGuardServiceService],
    component: WorkWithUsComponent,
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
