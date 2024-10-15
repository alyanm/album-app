import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Album } from './album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private http = inject(HttpClient);
  private albumsUrl = 'http://localhost:8080/albums';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor() {}

  getAlbums(): Observable<Album[]> {
    return this.http
      .get<Album[]>(this.albumsUrl)
      .pipe(catchError(this.handleError<Album[]>('getAlbums', [])));
  }

  handleError<T>(
    arg0: string,
    arg1: never[]
  ): (
    err: any,
    caught: Observable<Album[]>
  ) => import('rxjs').ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
}
