import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
})
export class AlbumDetailComponent {
  album: Album | undefined;
  errorMessage: string = '';

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
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

  deleteAlbum(id: number | undefined): void {
    if (!id) {
      console.error('Album ID is not defined');
      return;
    }

    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        console.log('Album deleted');
        // Redirect to the album list
        this.router.navigate(['']);
      },
      error: (error) => console.error('Failed to delete album', error),
    });
  }
}
