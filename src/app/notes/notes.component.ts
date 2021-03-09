import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { Note } from "../note";
import { NoteService } from '../note.service';

import { MessageService } from '../message.service';

//Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. 
//They should focus on presenting data and delegate data access to a service.
//CREATING A SERVICE
//create a HeroService that all application classes can use to get heroes. Instead of creating that service with the new keyword, 
//you'll rely on Angular dependency injection to inject it into the HeroesComponent constructor.
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	private sub: any;

	notes: Note[];
	networkMode = 'online';

	selectedNote?: Note;

//The parameter simultaneously defines a private noteService property and identifies it as a NoteService injection site.
//The NoteService.getNotes() method has a synchronous signature, which implies that the NoteService can fetch heroes synchronously. 
//The NotesComponent consumes the getNotes() result as if notes could be fetched synchronously.
  	constructor(private noteService: NoteService, private messageService: MessageService, private route: ActivatedRoute) { 
		navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';
	}


  	ngOnInit(): void {
		combineLatest(
      		this.route.params,
      		this.route.data,
      			(params: Params, data: Data) => ({
        		params,
        		data,
      		})
    		).subscribe((res: { params: Params; data: Data }) => {
      		const { params, data} = res;
			//need to subscribe to chnages in parameter??
			this.getNotes();
  		});
	}
	
	//HeroService.getHeroes() must have an asynchronous signature of some kind.
	//Observable is one of the key classes in the RxJS library.
	//Angular's HttpClient methods return RxJS Observables. In this tutorial, you'll simulate getting data from the server with the RxJS of() function.
	/*sychronous  
	getNotes(): void {
	  this.notes = this.noteService.getNotes();
	}
	SO THIS GETS CALLED EVERY TIME THE URL CHANGES!!!!
	*/
	/*asynchronous*/
	getNotes(): void {
		  	this.noteService.getNotes()
	      		.subscribe(notes => {
					this.notes = notes;
					console.log("NOTES=" + this.notes);
					this.noteService.importIDB("db1", "store1", this.notes);
				});
		/* NEEDS REPLACING WITH getIDBNotes
					this.noteService.getIDB("db1", "store1", 11)
				.then(note => {
					this.note = note;
					this.messageService.add("this.notes" + this.notes);
				});
		*/ 				
	}
	//Observable.subscribe() is the critical difference.  so an Observable getNotes() becomes getNotes().subscribe
	///*Asynchronous in note.service*/
	//getNotes(): Observable<Note[]> {
		
	onSelect(note: Note): void {
  		this.selectedNote = note;

	}

//When the given name is non-blank, the handler creates a 
//Note-like object from the name (it's only missing the id) and passes it to the services addNote() method.
//can I therefore create a Note-like object with more parameters set... 
	add(name: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.noteService.addNote({ name } as Note)
	    .subscribe(note => {
	      this.notes.push(note);
	    });
	}
	
	delete(note: Note): void {
	  this.notes = this.notes.filter(h => h !== note);
	  this.noteService.deleteNote(note).subscribe();
	}

}


