import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

//The next import, HeroesComponent, will give the Router somewhere to go once you configure the routes.
//redirectTo: '/note/11'
const routes: Routes = [
  	{ path: '', component: NotesComponent, outlet:'nav'}, 
  	{ path: 'notes', component: NotesComponent, outlet:'nav'},
	{ path: 'note/:id', component: NoteDetailComponent}
];

//this.router.navigateByUrl(`/courses/${course.id}`);

//{path: <base-path>, component: <component>, outlet: <target_outlet_name>}
//{ path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
//{ path: '', outlet: 'menu', loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }