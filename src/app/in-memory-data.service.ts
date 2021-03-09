import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  
createDb() {
    const notes = [
      { id: 11, name: 'GI' },
      { id: 12, name: 'Cardiovascular' },
      { id: 13, name: 'Respiratory' },
      { id: 14, name: 'MSK' }
    ];
    return {notes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
	genId(notes: Note[]): number {
    	return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  	}
}