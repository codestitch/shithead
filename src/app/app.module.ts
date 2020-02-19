import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
         enabled: environment.production
      }),
      DragDropModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {}
