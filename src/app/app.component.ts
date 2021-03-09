import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; 
import { combineLatest } from 'rxjs';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError,ActivatedRoute, Params, Data  } from '@angular/router';

//moved from https://github.com/mdbootstrap/MDB-Angular-PWA/blob/6-indexedDB-integration/src/app/app.component.ts
//may not be relevant as this is not a schedule app - but I like the class structure that comes from 
export interface Schedule {
  time: string;
  subject: string;
  location?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'angularpwa';
	networkMode = 'online';

	@ViewChild('sidenav') public sideNav: MatSidenav;

  	constructor(private route: ActivatedRoute, private router: Router) {   
		navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';
	}

//this.route = location.path();
	ngOnInit() {
		this.router.events.subscribe(evt => { 
		    if (evt instanceof NavigationStart) {
				console.log( "NavigationStart id:", evt.id );
				this.sideNav.close();
				//console.log( "route:", evt.url );
				//this.router.navigate(['/page']);
				//this.route.navigate(['/page']); // navigate to other page
				//this.routerChangeMethod(evt.url);
		    }
		    if (evt instanceof NavigationEnd) {
			//console.log("NavigationEnd");
			}
		  });
    }
  	reason = '';
	

  	close(reason: string) {
    	this.reason = reason;
    	this.sideNav.close();
  	}

}
