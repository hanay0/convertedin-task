// import { NgModule, isDevMode  } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { HttpClientModule } from '@angular/common/http';
// import { productReducer } from './products/store/product.reducer';
// import { ProductEffects } from './products/store/product.effects';
// import { AppComponent } from './app.component';
// import { NavbarComponent } from './layout/navbar/navbar.component';
// import { AppRoutingModule } from './app-routing.module';
// import { CommonModule } from '@angular/common';
// import { ProductListComponent } from './products/product-list/product-list.component';
// import { SidebarComponent } from './core/navbar/sidebar/sidebar.component';
// import { ProductDetailsComponent } from './products/product-details/product-details.component';

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { productReducer } from "./products/store/product.reducer";
import { ProductEffects } from "./products/store/product.effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { isDevMode, NgModule } from "@angular/core";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    EffectsModule.forRoot([ProductEffects, ]),
    StoreModule.forRoot({ products: productReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
