import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
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

  getAlbum(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http
      .get<Album>(url)
      .pipe(catchError(this.handleError<Album>(`getAlbum id=${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
