import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError,ActivatedRoute, Params, Data  } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { MessageService } from '../message.service';

//The note property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it like this.

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})

export class NoteDetailComponent implements OnInit {

	note: Note;
	networkMode = 'online';
	
	private sub: any;

	//The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
	//This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display
  	constructor(private route: ActivatedRoute,  private noteService: NoteService, private messageService: MessageService,  private location: Location ) { 
			navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';
	  }
	//
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
				console.log("IN COMBINE LATEST ngOnInit RES=" + res);
  				this.getNote();
		    });
		//NEW

	}//end of NgInit
	
	toggleAccordian(event, index) {
      var element = event.target;
      element.classList.toggle("active");
      var panel = element.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
  	}

	//added this const id to get the route snapshot from the url param id
	//I think this is being called twice
/*
	//get Promise type but does not work unless something in IDB which is not guarenteed.				
				this.noteService.getIDB("db1", "store1", gnoteid)
						.then(note => this.note = note);
this.noteService.getNotes()
	      		.subscribe(notes => {
					this.notes = notes;
				});
			try{
				
				/*this.noteService.getNotes()
	      		.subscribe(notes => {
					this.notes = notes;
				});*/
				//this.noteService.checkStore("db1", "store1");
//			} catch (e) {
//  			}	
/**Needs to look to see if indexedDB has data - if so then use that. 
If not use URL to get notes and set noteid on details page. 
 */
	getNote(): void {
		console.info("At Beginning of getNote bLoaded=" + this.noteService.bLoaded);			

  		var gnoteid = +this.route.snapshot.paramMap.get('id');
	  		if (gnoteid === 0) gnoteid=11; 
				this.noteService.getNote(gnoteid)
				    .subscribe(note => this.note = note);	
		//var bStoreExists = this.noteService.checkStore("db1", "store1");
	}
	
	save(): void {
		this.messageService.add(`NotesComponent: Selected note id=${this.note}`);
	  	this.noteService.updateNote(this.note)
    		.subscribe();
	}

	goBack(): void {
 	 this.location.back();
	}

}
