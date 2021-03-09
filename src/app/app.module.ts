import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { FormBuilder, FormControl, FormGroup } from '@angular/forms' //when using notejson.
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

//import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module'; // <-- NgModel lives here

//temporary whilst inMemoryDataService interupts http
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { NoteSearchComponent } from './note-search/note-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SafePipe } from './safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteDetailComponent,
    MessagesComponent,
    NoteSearchComponent,
    SafePipe
  ],
  imports: [
	HttpClientModule,
	// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
	// and returns simulated server responses.
	// Remove it when a real server is ready to receive requests.
	//HttpClientInMemoryWebApiModule.forRoot(
  	//	InMemoryDataService, { dataEncapsulation: false }
	//),
	//The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database
    BrowserModule, 
	FormsModule, AppRoutingModule, BrowserAnimationsModule,
	MatExpansionModule,
	MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    StoreModule.forRoot({}, {}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
