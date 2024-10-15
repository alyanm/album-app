import { Component } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
})
export class AlbumListComponent {
  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }
}
