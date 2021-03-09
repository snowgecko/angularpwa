import { Injectable } from '@angular/core';
import { Observable, of, isObservable , from} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { Note } from './note';

//import idb from "./idb";
//import * as idb from "idb";

import { openDB, deleteDB, wrap, unwrap } from 'idb';

////Promises.then() calls back Max 1 - ie, that 


//Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator. 
//This marks the class as one that participates in the dependency injection system. 
//The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. 
//It doesn't have any dependencies yet, but it will soon.
//The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
//The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.

const localUrl = 'assets/data/smartphone.json';

//By default, the Angular CLI command ng generate service registers a provider with the root injector for your service 
//by including provider metadata, that is providedIn: 'root' in the @Injectable() decorator.
@Injectable({
  providedIn: 'root'
})
export class NoteService {
private results : any[];
	//private results: Observable<Note[]>;
	public bLoaded = false; 
	networkMode = 'online';
	private glb_notes:Observable<Note[]>;

//var openRequest = indexedDB.open('recipeDatabase', dbVer);

/**
     * The database.
     */
    //db: IDBDatabase;
	//db: window.indexedDB;

  	constructor(private http: HttpClient,  private messageService: MessageService) {	
		navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';
	}
	
	ngOnInit(): void {		
	}

	httpOptions = {
  		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	//see export const NOTES: Note[] =  in mock-data
	/*Synchronus
	getNotes(): Note[] {
  		return NOTES;
	}*/
	//private notesUrl = 'api/notes';  // URL to web api
	//if I change this to json file?
//	private notesUrl = 'https://raw.githubusercontent.com/snowgecko/files/main/testdata.json';
	private notesUrl = '/assets/testdata.json';
	
	/** Log a HeroService message with the MessageService */
	private log(message: string) {
  		this.messageService.add(`NoteService: ${message}`);
	}
		
	async doDatabaseStuff() {
		openDB('db1', 1, {
		    upgrade(db) {
		      db.createObjectStore('store1');
		      db.createObjectStore('store2');
		    },
		  });
		  openDB('db2', 1, {
		    upgrade(db) {
		      db.createObjectStore('store3', { keyPath: 'id' });
		      db.createObjectStore('store4', { autoIncrement: true });
		    },
		  });
	  	//var idb = this.demo2();
	}
	
	// demo2: add some data into db1/store1/
	async demo2() {
		openDB('db1', 1, {
		    upgrade(db1) {
		      	db1.transaction('store1', "readwrite");
		    },
		  });
	}
	async getNotewID(id: number){
		return new Promise(function(resolve) {
			//const url = `${this.notesUrl}/${id}`;
			this.getIDB("db1", "store1", 11);
		});	
		//return await this.getIDB("db1", "store1", id);
		//const item = await this.dbObject.transaction("store1").objectStore("store1").get('${id}')
		//return item;		
	}
	checkStore(dbName:string, storeName:string){
		this.bLoaded = false;
		var tmpLoaded = false;			
		let openRequest = indexedDB.open(dbName);
		openRequest.onsuccess = function() {
			console.log("****database*****");
			tmpLoaded = true;
			console.log("tmpLoaded inside function=" + tmpLoaded);
		};
		this.bLoaded = tmpLoaded;
		return this.bLoaded;
	}

	async getIDB(dname, sname, key): Promise<any> {
	  return await new Promise(function(resolve) {
	    var r = indexedDB.open(dname)
	    r.onsuccess = function(e) {
	        var idb = r.result
	        let tactn = idb.transaction(sname, "readonly")
	        let store = tactn.objectStore(sname)
	        let data = store.get(key)
	        data.onsuccess = function() {
	          resolve(data.result) //Returns a new Promise object that is resolved with the given value.
	        }
	        tactn.oncomplete = function() {
	          idb.close()
	        }
	   	}
	  })
	}
	async getAllData(dname, sname): Promise<any>  {
	  return await new Promise(function(resolve) {
	    var r = indexedDB.open(dname)
	    r.onsuccess = function(e) {
	        var idb = r.result
	        let tactn = idb.transaction(sname, "readonly")
	        let store = tactn.objectStore(sname)
	        let data = store.getAll()
	        data.onsuccess = function() {
	          resolve(data.result)
	        }
	        tactn.oncomplete = function() {
	          idb.close()
	        }
	   	}
	  })
	}   
	
	//const locations = new Observable((observer) => 
	async importIDB(dname, sname, arr) {
		return new Promise(function(resolve) {
		    //hopefully assign an open db to an already //probably different due to IDB indexdb difference.
			var db = window.indexedDB.open(dname)
		    db.onupgradeneeded = function() {
		      var idb = db.result
		      var store = idb.createObjectStore(sname, {keyPath: "id"})
		    }
		    db.onsuccess = function() {
		      var idb = db.result
		        let tactn = idb.transaction(sname, "readwrite")
		    	  var store = tactn.objectStore(sname)
			        for(var obj of arr) {
		 	        	store.put(obj)
		    	    }
		        	resolve(idb)
		    }
	  })
	}

	/*Asynchronus'*/
	//All HttpClient methods return an RxJS Observable of something.
	//This particular HttpClient.get() call returns an Observable<Note[]>; that is, 
	//"an observable of note arrays". In practice, it will only return a single note array.
	//HttpClient.get() returns the body of the response as an untyped JSON object by default.
	//Applying the optional type specifier, <Note[]> , adds TypeScript capabilities, which reduce errors during compile time.
//By default HttpClient class’s “get()”, “put()”, “delete()” and “post()” methods returns “Observable<T>”.
//Once subscribed, “subscribe” callback shall be executed whenever there is a new data produced by “Observer”.
/*	
How this is subscribed too. in notes.component.
  this.noteService.getNotes()
      	.subscribe(notes => this.notes = notes);
*/
//When you subscribe for an observable in Angular 10, the code in the body of the 
//subscribe method gets executed each time a new value is received until you unsubscribe from the observable using the unsubscribe method.
/*
Use the HttpClient.get() method to fetch data from a server. 
The asynchronous method sends an HTTP request, and returns an Observable that emits the requested data when the response is received. 
The return type varies based on the observe and responseType values that you pass to the call.
  		//return notes;
		//this.messageService.add('NoteService: fetched notes');
		//console.info("this.notesURL in getNotes=****" + this.notesUrl);		
		//by adding subscribe to this.http? we are changing it to async not OBSERVABLE?
//calling an Observable with subscribe ///no good!!!
//this.results =  of(data);
//console.info("this.results=" + isObservable(this.results));
*/
//		console.info(this.checkStore("db1", "store1"));

	getHeroes(): Observable<Note[]> {

	  return this.http.get<Note[]>(this.notesUrl)
    	.pipe(
      		tap(_ => this.log('fetched heroes array')),
      		catchError(this.handleError<Note[]>('getHeroes', []))
    	);
	}

/*NEEDS TO BE CHANGED!!!
			return this.http.get<Note[]>(this.notesUrl).pipe(map(data: [] => {                     
	            this.importIDB("db1", "store1", data); 
				this.glb_notes = of(data);
				console.info("****ONLINE this does not have a value because its aynch*******this.glb_notes=" + this.glb_notes);
			});

*/ 
	
	getNotes(): Observable<Note[]> {  		//const notes = of(NOTES);
		console.info("in GetNotes()");
//	console.info("****ONLINE this does not have a value because its aynch*******this.glb_notes=" + this.glb_notes);

		if (this.networkMode == 'online'){						
			return this.http
	        	.get<Note[]>(this.notesUrl)		
				.pipe(
	      			map(
	        			(data: any[]) => {
						this.importIDB("db1", "store1", data); 
				console.info("******data"+ data);
	       				return this.results = data;
						})
					)								
		}else{
			console.info("in getNotesIDB()");
			//        			
			//return this when data there...
			return from(this.getAllData("db1", "store1"))
					.pipe(
	      			map(
	        			(data: any[]) => {
				console.info("******data"+ data);
	       				return this.results = data;
						})
					);
		}
	}
	//this.noteService.importIDB("db1", "store1", this.notes);

	
/*NEEDS TO BE CHANGED!!!*/ 
//from converts Promise to Observable...
	getNotesIDB(): Observable<Note[]> {  		//const notes = of(NOTES);
		return null;
	}
/*
	getNote() constructs a request URL with the desired hero's id.
	The server should respond with a single hero rather than an array of heroes.
	getNote() returns an Observable<Note> ("an observable of Note objects") rather than an observable of hero arrays .
	In app-routing.module.ts{ path: 'note/:id', component: NoteDetailComponent },
	*/
	//return state.city.find(c => c.id === id);
	//called from note-detail with this.noteService.getNote(gnoteid).subscribe(note => this.note = note);
	// this.getNotewID(id)

	getNote(id: number): Observable<Note> {
		//const url = `${this.notesUrl}/${id}`;
		console.log("IN GETNOTE() returned from indexedDB***");

//**TODO */Needs to actually check for the existence of the IndexedDB at this point.
		if (this.networkMode == 'offline'){						
	  		return this.http.get<Note>(this.notesUrl).pipe(
	    		tap(_ => this.log(`****fetched note id=${id}`)),
	    		catchError(this.handleError<Note>(`getNote id=${id}`))
	  		);
		}else{
			return from(this.getIDB("db1", "store1", id))
				.pipe(
      			map(
        			(data:any) => {
					console.info("******getIDB NOTE"+ data);
       				return this.results = data;
					})
				);
			
		}				
	}
	
//PUT /questions/{question-id}
//Use PUT when you want to modify a singular resource which is already a part of resources collection. PUT replaces the resource in its entirety. Use PATCH if request updates part of the resource.
	/** PUT: update the note on the server */
	updateNote(note: Note): Observable<any> {
		console.info("this.notesURL in updateNote=****" + this.notesUrl);
		//this.log(`before updated note id=${note.id}`);
	  return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
	    tap(_ => this.log(`updated note id=${note.name}`)),
	    catchError(this.handleError<any>('UPDATED NOTE'))
	  );
	}
//POST /questions
//Use POST when you want to add a child resource under resources collection.
	/** POST: add a new note to the server */
	addNote(note: Note): Observable<Note> {
  		return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
    		tap((newNote: Note) => this.log(`added note w/ id=${newNote.id}`)),
    		catchError(this.handleError<Note>('addNote'))
  		);
	}
	/** DELETE: delete the hero from the server */
	deleteNote(note: Note | number): Observable<Note> {
	  const id = typeof note === 'number' ? note : note.id;
	  const url = `${this.notesUrl}/${id}`;
	
	  return this.http.delete<Note>(url, this.httpOptions).pipe(
	    tap(_ => this.log(`deleted note id=${id}`)),
	    catchError(this.handleError<Note>('delete Note'))
	  );
	}
		/* GET heroes whose name contains search term */
	searchNotes(term: string): Observable<Note[]> {
	  if (!term.trim()) {
	    // if not search term, return empty hero array.
	    return of([]);
	  }
	  return this.http.get<Note[]>(`${this.notesUrl}/?name=${term}`).pipe(
	    tap(x => x.length ?
	       this.log(`found heroes matching "${term}"`) :
	       this.log(`no heroes matching "${term}"`)),
	    catchError(this.handleError<Note[]>('searchNotes', []))
	  );
	}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.info(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}


