import { Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';

export const routes: Routes = [
  { path: '', component: AlbumListComponent },
  {
    path: 'albums/:id',
    loadComponent: () =>
      import('./album-detail/album-detail.component').then(
        (m) => m.AlbumDetailComponent
      ),
  },
  {
    path: 'add-album',
    loadComponent: () =>
      import('./album-form/album-form.component').then(
        (m) => m.AlbumFormComponent
      ),
  },
  {
    path: 'edit-album/:id',
    loadComponent: () =>
      import('./album-edit/album-edit.component').then(
        (m) => m.AlbumEditComponent
      ),
  },
];
