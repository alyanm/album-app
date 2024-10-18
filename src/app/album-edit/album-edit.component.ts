import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './album-edit.component.html',
  styleUrl: './album-edit.component.css',
})
export class AlbumEditComponent {
  albumForm: FormGroup;
  album: Album | undefined;

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.albumForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    // Initialize the form with current values
    // If get error report to user
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Get Album with id: ', id);
    this.albumService.getAlbum(id).subscribe({
      next: (album) => {
        this.album = album;
        this.albumForm = this.fb.group({
          title: [album.title, Validators.required],
          artist: [album.artist, Validators.required],
          price: [
            album.price,
            [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
          ],
        });
      },

      error: (error) => console.error('Failed to load album', error),
    });
  }

  onSubmit(): void {
    if (!this.albumForm?.valid || !this.album) {
      console.error(
        'Form or album is invalid',
        this.albumForm?.valid,
        this.album
      );
      return;
    }

    console.log('Form submitted', this.albumForm.valid);
    const formValue = this.albumForm.value;
    const album = {
      id: this.album.id,
      ...formValue,
      price: parseFloat(formValue.price),
    };
    this.albumService.updateAlbum(album).subscribe({
      next: () => console.log('Album updated'),
      error: (error) => console.error('Failed to update album', error),
    });
  }
}
