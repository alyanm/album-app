import { Component } from '@angular/core';
import { Album } from '../album';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css',
})
export class AlbumDetailComponent {
  album: Album | undefined;
  errorMessage: string = '';

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Get Album with id: ', id);
    this.albumService.getAlbum(id).subscribe({
      next: (album) => (this.album = album),
      error: (error) => (this.errorMessage = 'Failed to load album'),
    });
  }
}
