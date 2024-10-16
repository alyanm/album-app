import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  standalone: true,
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];
  errorMessage: string = '';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (albums) => (this.albums = albums),
      error: (error) => (this.errorMessage = 'Failed to load albums'),
    });
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter((album) => album.id !== id);
      },
      error: (error) => console.error('Failed to delete album', error),
    });
  }
}
